import catchAsync from "../utils/catchAsync";
import { IGetUserAuthInfoRequest } from "../types/userTypes";
import express, { NextFunction } from "express";
require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    timezone: "Z",
  })
  .promise();
export const isConnectedToDB = async () => {
  try {
    await pool.getConnection();
    console.log("Connected to database");
    return true;
  } catch (error) {
    console.error("Error connecting to database:", error);
    return false;
  }
};

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
