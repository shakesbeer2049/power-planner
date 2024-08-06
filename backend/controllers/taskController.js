const Task = require("../models/taskModel.js");
const utils = require("../utils/utils.js");
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res
      .status(200)
      .json({ message: "success", tasks: tasks, count: tasks.length });
  } catch (error) {
    console.log(error);
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.find(req.params.id);
    res.status(200).json({ message: "success", tasks: task, count: 1 });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTask = async (req, res) => {
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

exports.updateTask = async (req, res) => {
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

exports.addTask = async (req, res) => {
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
