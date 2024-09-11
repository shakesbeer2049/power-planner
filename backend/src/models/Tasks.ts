const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
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
    type: [String],
    required: [true, "Task category is required"],
    enum: ["health", "wealth", "knowledge"],
  },
  taskRepeatsOn: {
    type: [String],
    required: [true, "Please select the days the task is repeated on."],
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  relatedUserId: {
    type: String,
    required: [true, "user id is required"],
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
