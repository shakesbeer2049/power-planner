const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { getDailyTasks } = require("./controllers/taskController");
const taskRouter = require("./routes/taskRouter");
const app = express();
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

mongoose
  .connect(
    "mongodb+srv://zubb:mongo123@cluster0.xerl2wa.mongodb.net/power-system"
  )
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(`error in db :  ${err}`));
app.listen(3003, () => {
  console.log("listening on port 3000");
});
