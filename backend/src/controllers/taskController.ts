const Task = require("../models/taskModel.js");
const utils = require("../utils/utils.js");
import express from "express";

export const getTasks = async (req:express.Request, res:express.Response) => {
  try {
    console.log("get")
    const tasks = await Task.find();
    res
      .status(200)
      .json({ message: "success", tasks: tasks, count: tasks.length });
  } catch (error) {
    console.log(error);
  }
};

export const getTask = async (req:express.Request, res:express.Response) => {
  try {
    const task = await Task.find(req.params.id);
    res.status(200).json({ message: "success", tasks: task, count: 1 });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (req:express.Request, res:express.Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    const tasks = await Task.find();
    res
      .status(200)
      .json({ message: "success", tasks: tasks, count: tasks.length });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (req:express.Request, res:express.Response) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const tasks = await Task.find();
    res
      .status(200)
      .json({ message: "success", tasks: tasks, count: tasks.length });
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (req:express.Request, res:express.Response) => {
  try {
    console.log("request-data", req.body);
    req.body.day = utils.getDayOfWeek();
    const resp = await Task.create(req.body);
    console.log("task res", resp);
    return res.status(200).json({ message: "success", status: "Task Added" });
  } catch (error) {
    console.log(error);
  }
};
