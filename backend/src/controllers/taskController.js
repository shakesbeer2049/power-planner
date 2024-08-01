const Task = require("../models/taskModel.js");
const utils = require("../utils/utils.js");
exports.getDailyTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res
      .status(200)
      .json({ message: "success", tasks: tasks, count: tasks.length });
  } catch (error) {
    console.log(error);
  }
};

exports.addDailyTask = async (req, res) => {
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
