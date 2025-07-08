import catchAsync from "../utils/catchAsync";
require("dotenv").config();
const mysql = require("mysql2");
let mysqlOptions;
if (process.env.NODE_ENV === "development") {
    mysqlOptions = {
        host: process.env.MYSQLHOSTDEV,
        user: process.env.MYSQLUSERDEV,
        password: process.env.MYSQLPASSWORDDEV,
        database: process.env.MYSQLDATABASEDEV,
        timezone: "Z",
    };
}
else {
    mysqlOptions = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}/${process.env.MYSQLDATABASE}`;
}
console.log(mysqlOptions, "mysqlOptions");
const pool = mysql.createPool(mysqlOptions).promise();
export const isConnectedToDB = async () => {
    try {
        await pool.getConnection();
        console.log("Connected to database");
        return true;
    }
    catch (error) {
        console.error("Error connecting to database:", error);
        return false;
    }
};
export const getAllTasksFromDB = catchAsync(async (req, res, next) => {
    const result = await pool.query("Select * FROM task_base");
    console.log(result[0], "query result");
    return result[0];
});
export { pool };
