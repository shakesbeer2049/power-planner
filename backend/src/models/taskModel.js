const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task Name is required"],
  },
  isCompleted: {
    type: Boolean,
    required: [true, "Task Status is required"],
    default: false,
  },
  date: { type: Date, default: Date.now },
  category: {
    type: [String],
    required: [true, "Task category is required"],
    default: false,
    enum: ["health", "wealth", "wise"],
  },
  day: {
    type: String,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
