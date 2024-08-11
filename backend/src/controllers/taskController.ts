const Task = require("../models/taskModel.js");
const utils = require("../utils/utils.js");
import express from "express";
import catchAsync from "../utils/catchAsync";

export const getTasks = catchAsync(async (req:express.Request, res:express.Response) => {
  console.log("get")
  const tasks = await Task.find();
  res
    .status(200)
    .json({ message: "success", tasks: tasks, count: tasks.length });
});

export const getTask = catchAsync(async (req:express.Request, res:express.Response) => {
  const task = await Task.find(req.params.id);
  res.status(200).json({ message: "success", tasks: task, count: 1 });
});

export const deleteTask = catchAsync(async (req:express.Request, res:express.Response) => {
  await Task.findByIdAndDelete(req.params.id);
  const tasks = await Task.find();
  res
    .status(200)
    .json({ message: "success", tasks: tasks, count: tasks.length });
  
});

export const updateTask = catchAsync(async (req:express.Request, res:express.Response) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  const tasks = await Task.find();
  res
    .status(200)
    .json({ message: "success", tasks: tasks, count: tasks.length });
});

export const addTask = catchAsync(async (req:express.Request, res:express.Response) => {
  console.log("request-data", req.body);
  req.body.day = utils.getDayOfWeek();
  const resp = await Task.create(req.body);
  console.log("task res", resp);
  return res.status(200).json({ message: "success", status: "Task Added" });
});
