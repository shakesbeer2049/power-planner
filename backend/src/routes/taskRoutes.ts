import {
  getTask,
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  getTasksForThisWeek,
} from "../controllers/taskController";
import { Router } from "express";
import * as authController from "../controllers/authController";
const router = Router();
// authController.protect,
router.route("/").get(getTasksForThisWeek).post(addTask);
router.route("/all").get(getAllTasks);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;
