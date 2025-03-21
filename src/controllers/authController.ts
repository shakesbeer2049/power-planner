import express from "express";
import { getUserByEmail } from "./userController";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import { generateJWT } from "../utils/helper";
import { IGetUserAuthInfoRequest } from "types/userTypes";
import { pool } from "../db/database";
import bcrypt from "bcryptjs";
const { promisify } = require("util");
import { v4 as uuid } from "uuid";

export const register = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { email, password, confirmPassword, username } = req.body;

    const userExists = await getUserByEmail(email);

    if (userExists)
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });

    // Check if password and confirmPassword are the same
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Passwords do not match",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = uuid();
    // create user
    const queryResponse = await pool.query(
      "INSERT INTO user_base (userId, username, email, password) VALUES (?, ?, ?, ?)",
      [userId, username, email, hashedPassword]
    );
    console.log(queryResponse, "new user");

    const [userResult] = await pool.query(
      "SELECT userId FROM user_base WHERE email = ?",
      [email]
    );

    const newUser = {
      id: userResult[0].userId,
      username,
      email,
    };
    const token = generateJWT(newUser.id.toString());
    return res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  }
);

export const login = catchAsync(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password)
      return next(
        new AppError("Email and password are required to login!", 400)
      );

    const queryResponse = await pool.query(
      "SELECT * FROM user_base WHERE email = ?",
      [email]
    );
    const user = queryResponse[0][0];

    if (!user || !user.password) {
      return next(new AppError("Incorrect email or password!", 401));
    }
    console.log(user.password, password);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(new AppError("Incorrect email or password!", 401));
    }

    user.password = "";
    const token = generateJWT(user.userId.toString());
    return res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  }
);

export const protect = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let token;

    // Check headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // check token
    if (!token) return next(new AppError("Unauthorized, Access Denied!", 401));

    // verify token
    const decoded: any = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const { id } = decoded;

    // check if user exists
    const queryResponse = await pool.query(
      `SELECT * FROM user_base WHERE userId = ?`,
      [id]
    );
    const [userExists] = queryResponse[0];
    if (!userExists) return next(new AppError("User does not exist!", 401));

    // compare pwdissued and jwt issued
    // if (userExists.changedPasswordAfter(decoded.iat)) {
    //   return next(new AppError("Please login again", 401));
    // }

    // Grant Access
    req.user = userExists;

    next();
  }
);

export const forgotPassword = catchAsync(
  async (
    req: IGetUserAuthInfoRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const queryResponse = await pool.query(
      `SELECT * FROM user_base WHERE email = ?`,
      [req.body.email]
    );
    const user = queryResponse[0];
    if (!user) {
      return next(new AppError("User with this email does not exist", 404));
    }

    const resetToken = user.createPasswordResetToken();
    await pool.query(`UPDATE user_base SET resetToken = ? WHERE userId = ?`, [
      resetToken,
      user.userId,
    ]);
  }
);
