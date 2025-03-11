import catchAsync from "../utils/catchAsync";
import { IGetUserAuthInfoRequest } from "../types/userTypes";
import express, { NextFunction } from "express";

const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "sql123",
    database: "consistent_db",
  })
  .promise();

export const getAllTasksFromDB: any = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: NextFunction
  ) => {
    const result = await pool.query("Select * FROM task_base");
    console.log(result[0], "query result");
    return result[0];
  }
);

export { pool };
