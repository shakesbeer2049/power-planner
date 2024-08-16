import Task from "../models/Tasks";
import * as utils from "../utils/helper";
import express, { NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const getTasks = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const tasks = await Task.find();
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
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    console.log(req.body)
    const updatedTask = await Task.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    const tasks = await Task.find();
    res
      .status(200)
      .json({ status: "success", data: { tasks }, count: tasks.length });
  }
);

export const addTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    req.body.day = utils.getDayOfWeek();
    const resp = await Task.create(req.body);
    return res.status(200).json({ status: "success", message: "Task Added" });
  }
);
