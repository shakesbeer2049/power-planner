import express, { NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { IGetUserAuthInfoRequest } from "types/userTypes";
import Gamify from "../utils/gamify";
import { pool } from "../db/database";
import { v4 as uuid } from "uuid";
import { scheduleTasks } from "../utils/helper";
import { format } from "date-fns";

export const getAllTasks = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    const [tasks] = await pool.query(
      `SELECT 
    TAB.taskId,
    TAB.taskName,
    TAB.createdOn,
    TAB.taskCategory,
    TAB.taskRepeatsOn,
    TAB.relatedUserId,
    TAL.logId,
    TAL.completedOn,
    TAS.scheduledOn,
    TAS.scheduleId
    FROM task_base TAB
    LEFT JOIN task_log TAL ON TAB.taskId = TAL.relatedTaskId
    LEFT JOIN task_schedule TAS ON TAB.taskId = TAS.relatedTaskId
    WHERE TAB.relatedUserId = ?;`,
      [req.user.userId]
    );
    res
      .status(200)
      .json({ status: "success", data: { tasks }, count: tasks.length });
  }
);

export const getTasksToday = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    const [tasks] = await pool.query(
      `SELECT 
    TAB.taskId,
    TAB.taskName,
    TAB.createdOn,
    TAB.taskCategory,
    TAB.taskRepeatsOn,
    TAB.relatedUserId,
    TAL.logId,
    TAL.completedOn,
    TAS.scheduledOn,
    TAS.scheduleId
    FROM task_base TAB
    LEFT JOIN task_log TAL ON TAB.taskId = TAL.relatedTaskId
    LEFT JOIN task_schedule TAS ON TAB.taskId = TAS.relatedTaskId
    WHERE TAB.relatedUserId = ? 
    AND TAS.scheduledOn >= CURDATE();`,
      [req.user.userId]
    );
    console.log("tasks", tasks);
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
    const [tasks] = await pool.query(
      `SELECT 
    TAB.taskId,
    TAB.taskName,
    TAB.createdOn,
    TAB.taskCategory,
    TAB.taskRepeatsOn,
    TAB.relatedUserId,
    TAS.scheduledOn,
    TAL.completedOn,
    TAS.scheduleId
FROM task_base TAB
LEFT JOIN task_schedule TAS 
    ON TAB.taskId = TAS.relatedTaskId
LEFT JOIN task_log TAL 
    ON TAB.taskId = TAL.relatedTaskId AND DATE(TAL.completedOn) = TAS.scheduledOn
WHERE TAB.relatedUserId = ? 
  AND TAS.scheduledOn BETWEEN DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
                          AND DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)
  AND (TAL.completedOn IS NULL OR DATE(TAL.completedOn) = TAS.scheduledOn)
ORDER BY TAS.scheduledOn, TAB.taskId;`,
      [req.user.userId]
    );
    console.log("tasks", tasks);
    res
      .status(200)
      .json({ status: "success", data: tasks || [], count: tasks.length });
  }
);

export const getTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const task = await pool.query(`SELECT * FROM task_base WHERE taskId = ?`, [
      req.params.id,
    ]);
    if (task.length === 0) return next(new AppError("Task not found", 404));
    res.status(200).json({ status: "success", data: task[0] || {}, count: 1 });
  }
);

export const deleteTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    // const deleteFromLogBase  = await pool.query(`DELETE FROM task_base WHERE relatedTaskId = ?`, [
    //   req.params.id,
    // ]);
    const result = await pool.query(
      `DELETE FROM task_base WHERE taskId = ? AND createdOn = ?`,
      [req.params.id, req.body.createdOn]
    );
    if (result.affectedRows === 0)
      return next(new AppError("Task not found", 404));

    res
      .status(200)
      .json({ status: "success", data: {}, message: "Task deleted" });
  }
);

export const deleteOne = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    // const deleteFromLogBase  = await pool.query(`DELETE FROM task_base WHERE relatedTaskId = ?`, [
    //   req.params.id,
    // ]);
    const result = await pool.query(
      `DELETE FROM task_schedule WHERE relatedTaskId = ? AND scheduledId = ?`,
      [req.params.id, req.body.createdOn]
    );
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
    if (!req.params.id || !req.body) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid request data",
      });
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const logId = uuid();
      const completedOn = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      // Check if task log entry already exists and lock the row for update
      const [existingLog] = await connection.query(
        `SELECT logId FROM task_log WHERE relatedTaskId = ? AND relatedUserId = ? FOR UPDATE`,
        [req.body.taskId, req.body.relatedUserId]
      );

      let result;
      // completing the task
      const today = format(new Date(), "yyyy-MM-dd");
      if (
        !req.body.logId &&
        existingLog.length === 0 &&
        req.body.scheduledOn.includes(today)
      ) {
        // Marking Task as Complete - Insert Log Entry
        [result] = await connection.query(
          `INSERT INTO task_log (logId, relatedTaskId, relatedUserId, completedOn) VALUES(?,?,?,?)`,
          [logId, req.body.taskId, req.body.relatedUserId, completedOn]
        );
        req.body.logId = logId;
        req.body.completedOn = completedOn;
        // mark as not complete and remove
      } else if (req.body.logId && existingLog.length > 0) {
        // Marking Task as Not Complete - Delete Log Entry
        [result] = await connection.query(
          `DELETE FROM task_log WHERE logId = ? AND relatedUserId = ?`,
          [req.body.logId, req.body.relatedUserId]
        );

        if (result.affectedRows === 0) {
          await connection.rollback();
          await connection.release();
          return res.status(404).json({
            status: "fail",
            message: "Task log not found or already deleted",
          });
        }

        req.body.logId = null;
        req.body.completedOn = null;
      } else if (!req.body.logId && existingLog.length > 0) {
        // If trying to mark as complete but entry already exists
        await connection.rollback();
        await connection.release();
        return res.status(400).json({
          status: "fail",
          message: "Task is already marked as complete",
        });
      }

      // Create a Gamify instance for the user
      const userProfile = new Gamify(req.user);
      const category = req.body.taskCategory;

      if (req.body.logId) {
        userProfile.increaseTotalXp();
        userProfile.increaseXp();
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
        userProfile.decreaseTotalXp();
        userProfile.decreaseXp();
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

      userProfile.checkUpgrades();

      const [updatedUserStat] = await connection.query(
        `UPDATE user_base 
         SET xp = ?, lvl = ?, hp = ?, kp = ?, wp = ?, ranked = ?, 
         nextXp = ?, lastXp = ?, totalXp = ? 
         WHERE userId = ?`,
        [
          userProfile.xp,
          userProfile.lvl,
          userProfile.hp,
          userProfile.kp,
          userProfile.wp,
          userProfile.ranked,
          userProfile.nextXp,
          userProfile.lastXp,
          userProfile.hp + userProfile.kp + userProfile.wp,
          req.user.userId,
        ]
      );

      if (updatedUserStat.affectedRows === 0) {
        await connection.rollback();
        await connection.release();
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      await connection.commit();
      await connection.release();

      res.status(200).json({
        status: "success",
        data: { task: req.body, user: userProfile },
        count: 1,
      });
    } catch (error) {
      await connection.rollback();
      await connection.release();
      console.error("Error updating task:", error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while updating the task",
      });
    }
  }
);

export const addTask = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    console.log("task details", req.body);
    const { taskName, taskCategory, taskRepeatsOn, relatedUserId } = req.body;
    if (!taskName || !taskCategory || !taskRepeatsOn || !relatedUserId) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields in request body",
      });
    }
    const taskId = uuid();
    await pool.query(
      `INSERT INTO task_base (taskId, taskName, taskCategory, taskRepeatsOn, relatedUserId) VALUES(?,?,?,?,?)`,
      [
        taskId,
        taskName,
        taskCategory,
        JSON.stringify(taskRepeatsOn),
        relatedUserId,
      ]
    );

    // Check for today's task among created tasks
    const [todayTask] = await pool.query(
      `SELECT * FROM task_base WHERE taskId = ?`,
      [taskId]
    );

    await scheduleTasks(
      taskId,
      relatedUserId,
      taskRepeatsOn || [],
      todayTask[0].createdOn
    );
    console.log("todayTask", todayTask);
    const newTask = { ...todayTask[0], scheduledOn: todayTask[0].createdOn };
    return res.status(200).json({
      status: "success",
      message: "Task Added",
      data: { task: newTask },
    });
  }
);
