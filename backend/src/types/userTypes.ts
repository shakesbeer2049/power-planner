import { ObjectId } from "mongoose";

export interface User {
  _id: ObjectId;
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

  // Method to verify password
  verifyPassword(enteredPwd: string): Promise<boolean>;
}
