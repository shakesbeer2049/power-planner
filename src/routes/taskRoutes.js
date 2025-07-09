import {
  getTask,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  getTasksForThisWeek,
  getTasksToday,
} from "../controllers/taskController.js";
import { Router } from "express";
const router = Router();
// authController.protect,
router.route("/").get(getTasksToday).post(addTask);
router.route("/all").get(getAllTasks);
router.route("/weekly").get(getTasksForThisWeek);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;
