import express, { NextFunction } from "express";

const catchAsync = (fn: any) => {
  return (req: express.Request, res: express.Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  };
};

export default catchAsync;
