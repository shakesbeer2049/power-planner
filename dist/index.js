import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import http from "http";
import taskRouter from "./routes/taskRoutes";
import userRouter from "./routes/userRoutes";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/globalErrorHandler";
import * as authController from "./controllers/authController";
import { isConnectedToDB } from "./db/database";
const morgan = require("morgan");
require("dotenv").config();
const app = express();
// Use morgan middleware
app.use(morgan("dev"));
app.use(cors({
    credentials: true,
}));
// Middlewares
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
//? ROUTES
app.get("/api/v1/home", authController.protect, (req, res) => {
    res.status(200).json({
        status: "success",
        data: req.user,
    });
});
app.use("/api/v1/tasks", authController.protect, taskRouter);
app.use("/api/v1/users", userRouter);
// Unhandled routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Error handler
app.use(globalErrorHandler);
// create server
const server = http.createServer(app);
isConnectedToDB();
// Listen to requests on server
server.listen(process.env.PORT, () => {
    console.log("Server is listening to requests at PORT", process.env.PORT);
});
