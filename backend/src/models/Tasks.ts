const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "TaskID is required"],
  },
  taskName: {
    type: String,
    required: [true, "Task Name is required"],
  },
  isCompleted: {
    type: Boolean,
    required: [true, "Task Status is required"],
    default: false,
  },
  createdOn: { type: Date, default: Date.now },
  taskCategory: {
    type: String,
    required: [true, "Task category is required"],
  },
  taskRepeatsOn: {
    type: String,
    required: [true, "Please select the days the task is repeated on."],
  },
  relatedUserId: {
    type: String,
    required: [true, "user id is required"],
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
