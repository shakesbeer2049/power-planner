import catchAsync from "../utils/catchAsync";
import express from "express";
import { pool } from "../db/database";

export const getAllUsers = catchAsync(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userQueryRes = await pool.query("SELECT * FROM user_base");
    const users = userQueryRes[0];
    res
      .status(200)
      .json({ status: "success", data: { users }, count: users.length });
  }
);

export const getUserByEmail = async (email: string) => {
  const [rows] = await pool.query("SELECT * FROM user_base WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

export const getUserById = async (id: string) => {
  const [rows] = await pool.query("SELECT * FROM user_base WHERE id = ?", [id]);
  return rows[0];
};

export const getUserBySessionToken = async (sessionToken: string) => {
  const [rows] = await pool.query(
    "SELECT * FROM user_base WHERE sessionToken = ?",
    [sessionToken]
  );
  return rows[0];
};

// export const createUser = async (values: Record<string, any>) => {
//   const { insertId } = await pool.query("INSERT INTO user_base SET ?", values);
//   const [newUser] = await pool.query("SELECT * FROM user_base WHERE id = ?", [
//     insertId,
//   ]);
//   return newUser[0];
// };

export const deleteUserById = async (id: string) => {
  await pool.query("DELETE FROM user_base WHERE id = ?", [id]);
};

export const updateUserById = async (
  id: string,
  values: Record<string, any>
) => {
  await pool.query("UPDATE user_base SET ? WHERE id = ?", [values, id]);
};
