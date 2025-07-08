import catchAsync from "../utils/catchAsync";
import { IGetUserAuthInfoRequest } from "../types/userTypes";
import express, { NextFunction } from "express";
require("dotenv").config();
const mysql = require("mysql2");

let mysqlOptions;
if (process.env.NODE_ENV === "development") {
  mysqlOptions = {
    host: process.env.MYSQLHOSTDEV,
    user: process.env.MYSQLUSERDEV,
    password: process.env.MYSQLPASSWORDDEV,
    database: process.env.MYSQLDATABASEDEV,
    timezone: "Z",
  };
} else {
  mysqlOptions = {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    timezone: "Z",
  };
}
console.log(mysqlOptions, "mysqlOptions");
const pool = mysql.createPool(mysqlOptions).promise();
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
