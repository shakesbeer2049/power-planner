import express, { NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { IGetUserAuthInfoRequest } from "types/userTypes";
import { getEndOfWeek, getStartOfWeek, getToday } from "../utils/dates";
import Gamify from "../utils/gamify";
import { pool } from "../db/database";

export const getAllTasks = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    const [tasks] = await pool.query(
      `SELECT * FROM task_base WHERE relatedUserId = ?`,
      [req.user.userID]
    );
    res
      .status(200)
      .json({ status: "success", data: { tasks }, count: tasks.length });
  }
);

export const getTasksForThisWeek = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    const startOfWeek = getStartOfWeek(new Date());
    const endOfWeek = getEndOfWeek(new Date());
    const [tasks] = await pool.query(
      `SELECT * FROM task_base WHERE relatedUserId = ? AND createdOn BETWEEN ? AND ?`,
      [req.user.userID, startOfWeek, endOfWeek]
    );
    console.log("tasks", tasks);
    res
      .status(200)
      .json({ status: "success", data: { tasks }, count: tasks.length });
  }
);

export const getTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const task = await pool.query(`SELECT * FROM task_base WHERE id = ?`, [
      req.params.id,
    ]);
    if (task.length === 0) return next(new AppError("Task not found", 404));
    res
      .status(200)
      .json({ status: "success", data: { task: task[0] }, count: 1 });
  }
);

export const deleteTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const result = await pool.query(`DELETE FROM task_base WHERE id = ?`, [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return next(new AppError("Task not found", 404));

    res
      .status(200)
      .json({ status: "success", data: {}, message: "Task deleted" });
  }
);

export const updateTask = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    // Validate req.body
    if (!req.params.id || !req.body) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid request data",
      });
    }

    // Find and update the task
    const result = await pool.query(`UPDATE tasks SET ? WHERE id = ?`, [
      req.body,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    // Create a Gamify instance for the user
    const userProfile = new Gamify(req.user);

    const { isCompleted, taskCategory } = req.body;
    const category = taskCategory;

    if (isCompleted) {
      userProfile.increaseTotalXP();
      userProfile.increaseXP();
      switch (category) {
        case "health":
          userProfile.increaseHP();
          break;
        case "wealth":
          userProfile.increaseWP();
          break;
        case "knowledge":
          userProfile.increaseKP();
          break;
        default:
          break;
      }
    } else {
      userProfile.decreaseTotalXP();
      userProfile.decreaseXP();
      switch (category) {
        case "health":
          if (req.user.hp > 0) userProfile.decreaseHP();
          break;
        case "wealth":
          if (req.user.wp > 0) userProfile.decreaseWP();
          break;
        case "knowledge":
          if (req.user.kp > 0) userProfile.decreaseKP();
          break;
        default:
          break;
      }
    }

    // Update the user's XP and check for upgrades

    userProfile.checkUpgrades();

    // Save the updated user object to the database
    const updatedUserStat = await pool.query(
      `UPDATE users SET xp = ?, lvl = ?, hp = ?, kp = ?, wp = ?, rank = ?, nextXP = ?, lastXP = ?, totalXP = ? WHERE id = ?`,
      [
        userProfile.xp,
        userProfile.lvl,
        userProfile.hp,
        userProfile.kp,
        userProfile.wp,
        userProfile.rank,
        userProfile.nextXP,
        userProfile.lastXP,
        userProfile.hp + userProfile.kp + userProfile.wp,
        req.user._id,
      ]
    );

    if (updatedUserStat.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Respond with the updated task and user data
    res.status(200).json({
      status: "success",
      data: { updatedTask: req.body, user: userProfile },
      count: 1,
    });
  }
);

export const addTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    console.log("task details", req.body);
    const {
      taskName,
      isCompleted,
      taskCategory,
      taskRepeatsOn,
      relatedUserId,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO task_base (taskName, isCompleted, taskCategory, taskRepeatsOn, relatedUserId) VALUES(?,?,?,?,?)`,
      [
        taskName,
        isCompleted,
        taskCategory,
        JSON.stringify(taskRepeatsOn),
        relatedUserId,
      ]
    );

    // Check for today's task among created tasks
    const todayTask = await pool.query(
      `SELECT * FROM task_base WHERE taskID = ? AND taskRepeatsOn = ?`,
      [result.insertId, getToday()]
    );

    return res.status(200).json({
      status: "success",
      message: "Task(s) Added",
      data: todayTask[0],
    });
  }
);
