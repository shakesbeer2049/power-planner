import express, { NextFunction } from "express";
import AppError from "../utils/appError";

const sendDevError = (err: any, res: express.Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProductionError = (err: any, res: express.Response) => {
 
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR", err);
  }
};

const handleJWTError = (error:any) => {
  return new AppError("Invalid Token, Please login again", 401)
}

const globalErrorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "production") {

    let error = {...err};

    if(error.name === "JsonWebTokenError"){
      error = handleJWTError(error);
    }
    sendProductionError(error, res);
  } else {
    sendDevError(err, res);
  }
};

export default globalErrorHandler;
