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
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      {
        new: true,
      }
    );

    const userProfile = new Gamify(req.user);
    if (req.body.isCompleted) {
      switch (req.body.taskCategory[0]) {
        case "health":
          req.user.hp = userProfile.increaseHP();
          break;

        case "wealth":
          req.user.wp = userProfile.increaseWP();

          break;

        case "knowledge":
          req.user.kp = userProfile.increaseKP();
          break;

        default:
          break;
      }

      req.user.xp = req.user.kp + req.user.wp + req.user.hp;
      userProfile.checkUpgrades();
    } else {
      switch (req.body.taskCategory[0]) {
        case "health":
          req.user.hp = userProfile.decreaseHP();
          break;

        case "wealth":
          req.user.wp = userProfile.decreaseWP();

          break;

        case "knowledge":
          req.user.kp = userProfile.decreaseKP();
          break;

        default:
          break;
      }

      req.user.xp = req.user.kp + req.user.wp + req.user.hp;
    }

    const updatedUserStat = await User.findByIdAndUpdate(
      req.user._id,
      req.user,
      { new: true }
    );

    res.status(200).json({
      status: "success",
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
