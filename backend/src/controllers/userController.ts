import catchAsync from "../utils/catchAsync";
import User from "../models/Users";
import express from "express";

export const getAllUsers = catchAsync(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      count: users.length,
      data: {
        users,
      },
    });
  }
);

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const getUserById = (id: string) => {
  return User.findById(id);
};

export const getUserBySessionToken = (sessionToken: string) => {
  return User.findOne({ "authenticate.sessionToken": sessionToken });
};

export const createUser = async (values: Record<string, any>) => {
  let user = await new User(values).save();
  const newUser = user.toObject();
  return newUser;
};

export const deleteUserById = (id: string) => {
  User.findByIdAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  User.findByIdAndUpdate(id, values);
};
