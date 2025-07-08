import { NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../types/userTypes";
import Gamify from "../utils/gamify";

export const attachGamify = async (
  req: IGetUserAuthInfoRequest,
  res: Express.Response,
  next: NextFunction
) => {
  if (req.user) {
    req.user.gamify = new Gamify(req.user); // Create Gamify instance ONCE
  }
  next();
};
