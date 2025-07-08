import catchAsync from "../utils/catchAsync";
import { pool } from "../db/database";
export const getAllUsers = catchAsync(async (req, res, next) => {
    const userQueryRes = await pool.query("SELECT * FROM user_base");
    const users = userQueryRes[0];
    res
        .status(200)
        .json({ status: "success", data: { users }, count: users.length });
});
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM user_base WHERE email = ?", [
        email,
    ]);
    return rows[0];
};
export const getUserByUsername = async (username) => {
    const [rows] = await pool.query("SELECT * FROM user_base WHERE username = ?", [username]);
    return rows[0];
};
export const getUserById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM user_base WHERE userId = ?", [
        id,
    ]);
    return rows[0];
};
export const getUserBySessionToken = async (sessionToken) => {
    const [rows] = await pool.query("SELECT * FROM user_base WHERE sessionToken = ?", [sessionToken]);
    return rows[0];
};
// export const createUser = async (values: Record<string, any>) => {
//   const { insertId } = await pool.query("INSERT INTO user_base SET ?", values);
//   const [newUser] = await pool.query("SELECT * FROM user_base WHERE id = ?", [
//     insertId,
//   ]);
//   return newUser[0];
// };
export const deleteUserById = async (id) => {
    await pool.query("DELETE FROM user_base WHERE id = ?", [id]);
};
export const updateUserById = async (id, values) => {
    await pool.query("UPDATE user_base SET ? WHERE userId = ?", [values, id]);
};
export const getLeaderboards = async (req, res, next) => {
    try {
        const result = await pool.query(`
      SELECT 
        userId, username, totalXp, lvl, wp, hp, kp,ranked,
        ((totalXp * 0.3) + (lvl * 15) + ((wp + hp + kp) * 0.2)) AS score
      FROM user_base
      ORDER BY score DESC
      LIMIT 50;
    `);
        const scores = result[0];
        res
            .status(200)
            .json({ status: "success", data: { scores }, count: scores.length });
    }
    catch (error) {
        console.error("Error in fetching leaderboards:", error);
    }
};
