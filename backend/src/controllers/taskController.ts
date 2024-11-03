import Task from "../models/Tasks";
import * as utils from "../utils/helper";
import express, { NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { IGetUserAuthInfoRequest } from "types/userTypes";
import { getEndOfWeek, getStartOfWeek, getToday } from "../utils/dates";
import Gamify from "../utils/gamify";
import User from "../models/Users";

export const getAllTasks = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    const tasks = await Task.find({ relatedUserId: req.user._id });

    res
      .status(200)
      .json({ status: "success", data: { tasks }, count: tasks.length });
  }
);

export const getTasksForThisWeek = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    const startOfWeek = getStartOfWeek(new Date());
    const endOfWeek = getEndOfWeek(new Date());
    const tasks = await Task.find({
      relatedUserId: req.user._id,
      createdOn: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    });
    console.log("tasks", tasks);
    res
      .status(200)
      .json({ status: "success", data: { tasks }, count: tasks.length });
  }
);

export const getTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new AppError("Task not found", 404));
    res
      .status(200)
      .json({ status: "success", data: { task }, count: task.length });
  }
);

export const deleteTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return next(new AppError("Task not found", 404));

    res
      .status(200)
      .json({ status: "success", data: {}, message: "Task deleted" });
  }
);

export const updateTask = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    // Validate req.body
    if (!req.params.id || !req.body) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid request data",
      });
    }

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    // Create a Gamify instance for the user
    const userProfile = new Gamify(req.user);

    const { isCompleted, taskCategory } = req.body;
    const category = taskCategory;

    if (isCompleted) {
      userProfile.increaseTotalXP();
      userProfile.increaseXP();
      switch (category) {
        case "health":
          userProfile.increaseHP();
          break;
        case "wealth":
          userProfile.increaseWP();
          break;
        case "knowledge":
          userProfile.increaseKP();
          break;
        default:
          break;
      }
    } else {
      userProfile.decreaseTotalXP();
      userProfile.decreaseXP();
      switch (category) {
        case "health":
          if (req.user.hp > 0) userProfile.decreaseHP();
          break;
        case "wealth":
          if (req.user.wp > 0) userProfile.decreaseWP();
          break;
        case "knowledge":
          if (req.user.kp > 0) userProfile.decreaseKP();
          break;
        default:
          break;
      }
    }

    // Update the user's XP and check for upgrades

    userProfile.checkUpgrades();

    // Save the updated user object to the database
    const updatedUserStat = await User.findByIdAndUpdate(
      req.user._id,
      {
        xp: userProfile.xp,
        lvl: userProfile.lvl,
        hp: userProfile.hp,
        kp: userProfile.kp,
        wp: userProfile.wp,
        rank: userProfile.rank,
        nextXP: userProfile.nextXP,
        lastXP: userProfile.lastXP,
        totalXP: userProfile.hp + userProfile.kp + userProfile.wp,
      },
      { new: true }
    );

    if (!updatedUserStat) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Respond with the updated task and user data
    res.status(200).json({
      status: "success",
      data: { updatedTask, user: updatedUserStat },
      count: 1,
    });
  }
);

export const addTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    console.log("task details", req.body);
    const createdTasks = await Task.create(req.body);

    // Check for today's task among created tasks
    const todayTask = createdTasks.find(
      (task: any) => task.taskRepeatsOn === getToday()
    );

    return res.status(200).json({
      status: "success",
      message: "Task(s) Added",
      data: todayTask,
    });
  }
);
