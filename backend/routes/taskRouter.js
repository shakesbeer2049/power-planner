const express = require("express");
const taskService = require("../controllers/taskController");
const router = express.Router();

router.route("/").get(taskService.getDailyTasks).post(taskService.addDailyTask);

router
  .route("/:id")
  .get(taskService.getTask)
  .put(taskService.updateTask)
  .delete(taskService.deleteTask);

module.exports = router;
