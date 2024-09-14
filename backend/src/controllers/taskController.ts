import Task from "../models/Tasks";
import * as utils from "../utils/helper";
import express, { NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { IGetUserAuthInfoRequest } from "types/userTypes";
import { getEndOfWeek, getStartOfWeek } from "../utils/dates";
import Gamify from "../utils/gamify";
import User from "../models/Users";

export const getAllTasks = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    const tasks = await Task.find({ relatedUserId: req.user._id });
    // console.log("tasks", tasks);

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
    // console.log("tasks This week", tasks);

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
    console.log(req.params, req.body);

    // Validate req.body
    if (!req.params.id || !req.body) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid request data',
      });
    }

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        status: 'fail',
        message: 'Task not found',
      });
    }

    // Create a Gamify instance for the user
    const userProfile = new Gamify(req.user);

    const { isCompleted, taskCategory } = req.body;
    const category = taskCategory[0];

    if (isCompleted) {
      req.user.xp = userProfile.increaseXP();
      switch (category) {
        case 'health':
          req.user.hp = userProfile.increaseHP();
          break;
        case 'wealth':
          req.user.wp = userProfile.increaseWP();
          break;
        case 'knowledge':
          req.user.kp = userProfile.increaseKP();
          break;
        default:
          break;
      }
    } else {
      req.user.xp = userProfile.decreaseXP();
      switch (category) {
        case 'health':
          if (req.user.hp > 0) req.user.hp = userProfile.decreaseHP();
          break;
        case 'wealth':
          if (req.user.wp > 0) req.user.wp = userProfile.decreaseWP();
          break;
        case 'knowledge':
          if (req.user.kp > 0) req.user.kp = userProfile.decreaseKP();
          break;
        default:
          break;
      }
    }

    // Update the user's XP and check for upgrades
    // req.user.xp = req.user.kp + req.user.wp + req.user.hp;
    userProfile.checkUpgrades();

    // Save the updated user object to the database
    const updatedUserStat = await User.findByIdAndUpdate(
      req.user._id,
      {
        xp: req.user.xp,
        lvl: req.user.lvl,
        hp: req.user.hp,
        kp: req.user.kp,
        wp: req.user.wp,
        rank: userProfile.rank,
        nextXP: userProfile.nextXP,
      },
      { new: true }
    );

    if (!updatedUserStat) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    // Respond with the updated task and user data
    res.status(200).json({
      status: 'success',
      data: { updatedTask, user: updatedUserStat },
      count: 1,
    });
  }
);

export const addTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const repeatDays = req.body.taskRepeatsOn;
    if (repeatDays.length > 1) {
      repeatDays.forEach(async (day: string) => {
        let newTaskBody = { ...req.body, taskRepeatsOn: [day] };
        await Task.create(newTaskBody);
      });
    } else await Task.create(req.body);

    return res.status(200).json({ status: "success", message: "Task Added" });
  }
);
