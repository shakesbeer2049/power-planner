import express from "express";
import * as userController from "../controllers/userController.js";
const router = express.Router();
import * as authController from "../controllers/authController.js";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);

router.route("/").get(userController.getAllUsers);
router.route("/leaderboards").get(userController.getLeaderboards);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

export default router;
