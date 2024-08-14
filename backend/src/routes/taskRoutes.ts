import {
  getTask,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { Router } from "express";
import * as authController from "../controllers/authController";
const router = Router();

router.route("/").get(authController.protect, getTasks).post(addTask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;
