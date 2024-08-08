import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";

const app = express();

app.use(cors({
  credentials: true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


// const { getDailyTasks } = require("../controllers/taskController");
// const taskRouter = require("../routes/taskRouter");

// app.use("/api/v1/tasks", taskRouter);


const server = http.createServer(app);

mongoose
  .connect(
    "mongodb+srv://test-user:testpwd@cluster0.mutxc.mongodb.net/power-system?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(`error in db :  ${err}`));


server.listen(3003, () => {
  console.log("listening on port 3003");
});
