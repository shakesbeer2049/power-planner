import express from "express";
import { createUser, getUserByEmail } from "./userController";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import User from "../models/Users";
import { generateJWT } from "../utils/helper";
import { IGetUserAuthInfoRequest } from "types/userTypes";
const { promisify } = require("util");

export const register = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { email } = req.body;

    const userExists = await getUserByEmail(email);

    if (userExists)
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });

    // create user
    const newUser = await createUser({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    newUser.password = "";
    const token = generateJWT(newUser._id.toString());
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
    const { email, password } = req.body;

    if (!email || !password)
      return next(
        new AppError("Email and password are required to login!", 400)
      );

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password))) {
      return next(new AppError("incorrect email or password!", 401));
    }

    user.password = "";
    const token = generateJWT(user._id.toString());
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
    const userExists = await User.findById(id);
    if (!userExists) return next(new AppError("User does not exist!", 401));

    // compare pwdissued and jwt issued
    if (userExists.changedPasswordAfter(decoded.iat)) {
      return next(new AppError("Please login again", 401));
    }

    // Grant Access
    req.user = userExists;

    next();
  }
);
