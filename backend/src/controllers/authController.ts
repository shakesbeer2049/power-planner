import express from "express";
import { createUser, getUserByEmail } from "./userController";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import User from "../models/Users";
import { generateJWT } from "../utils/helper";

export const register = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { email } = req.body;

    const userExists = await getUserByEmail(email);

    if (userExists) return res.status(400);

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

    const token = generateJWT(user._id.toString());
    return res.status(200).json({
      status: "success",
      token,
    });
  }
);

export const protect = catchAsync(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new AppError("Unauthorized, Access Denied!", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "decoded");
  }
);
