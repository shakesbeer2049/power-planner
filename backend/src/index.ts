import express, { NextFunction } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import taskRouter from "./routes/tasks";
import AppError from './utils/appError';
import globalErrorHandler from "./controllers/globalErrorHandler";
require('dotenv').config();

const app = express();

app.use(cors({
  credentials: true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


app.use("/api/v1/tasks", taskRouter);

app.all('*', (req:express.Request, res:express.Response, next:any) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
} )

app.use(globalErrorHandler);
 
const server = http.createServer(app);

mongoose
  .connect(
    process.env.MONGO_URI_2
  )
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(`error in db :  ${err}`));


server.listen(3003, () => {
  console.log("listening on port 3003");
});
