import {getTask, getTasks, addTask, updateTask, deleteTask} from "../controllers/taskController";
import { Router } from "express";
const router = Router();

router.route("/").get(getTasks).post(addTask);

router
  .route("/:id")
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

export default router;
