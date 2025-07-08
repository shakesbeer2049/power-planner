import jwt from "jsonwebtoken";
import crypto, { BinaryLike } from "crypto";
import { v4 as uuid } from "uuid";
import { pool } from "../db/database";
import { format, addDays, startOfDay } from "date-fns";

export const getDayOfWeek = function () {
  const date = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()]; // Return the corresponding day name
};

// Generate JWT
export const generateJWT = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.JWT_SECRET as BinaryLike)
    .digest("hex");
};

// Helper function to schedule tasks

export const scheduleTasks = async (
  taskId: string,
  relatedUserId: string,
  taskRepeatsOn: string[],
  createdOn: Date
) => {
  try {
    const today = startOfDay(new Date()); // Start from the beginning of today (midnight)

    const currentDayOfWeek = format(today, "EEEE"); // Get the current day of the week (e.g., "Wednesday")

    // If today is Sunday, allow scheduling for the entire next week
    const isSunday = currentDayOfWeek === "Sunday";
    const daysToSchedule = isSunday ? 7 : 8 - today.getDay();

    for (let i = 0; i < daysToSchedule; i++) {
      const currentDate = addDays(today, i); // Add `i` days to today
      const currentDay = format(currentDate, "EEEE"); // Get the day of the week for the current date

      if (taskRepeatsOn.includes(currentDay)) {
        const scheduledOn = format(currentDate, "yyyy-MM-dd"); // Format the date in YYYY-MM-DD format
        const query = await pool.query(
          `INSERT INTO task_schedule (scheduleId, relatedTaskId, relatedUserId, scheduledOn, createdOn) VALUES (?, ?, ?, ?, ?)`,
          [uuid(), taskId, relatedUserId, scheduledOn, createdOn]
        );
        console.log(query, "query");
      }
    }
  } catch (error) {
    console.log("error in scheduleTasks", error);
  }
};
