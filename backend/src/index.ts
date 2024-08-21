import express, { NextFunction } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";
import http from "http";
import taskRouter from "./routes/taskRoutes";
import userRouter from "./routes/userRoutes";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/globalErrorHandler";
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

// Middlewares
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//? ROUTES
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

// Unhandled routes
app.all("*", (req: express.Request, res: express.Response, next: any) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler
app.use(globalErrorHandler);

// create server
const server = http.createServer(app);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI_2)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(`error in db :  ${err}`));

// Listen to requests on server
server.listen(process.env.PORT, () => {
  console.log("Server is listening to requests at PORT", process.env.PORT);
});
