import { ObjectId } from "mongoose";
import { Request } from "express";

export interface IGetUserAuthInfoRequest extends Request {
  user: any; // or any other type
  related_user_id: String;
}
export interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  // add other fields as needed
}

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  passwordChangedAt: Date;
  createdOn: Date;
  xp: number;
  lvl: number;
  hp: number;
  wp: number;
  kp: number;
  rank: "Recruit";
  nextXP: number;
  lastXP: number;
  totalXP: number;
  passwordResetExpiresAt: Date;
  passwordRestToken: String;

  // Method to verify password
  verifyPassword(enteredPwd: string): Promise<boolean>;
  changedPasswordAfter(iat: number): Promise<boolean>;
  createPasswordResetToken(): any;
}
