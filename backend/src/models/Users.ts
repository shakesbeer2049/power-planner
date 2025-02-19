import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IUser } from "types/userTypes";
import crypto from "crypto";

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: [true, "Please enter a username"] },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter confirm password"],
    validate: {
      validator: function (el: string) {
        return el === this.password;
      },
    },
    message: "Passwords do not match",
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  createdOn: { type: Date, default: Date.now },
  xp: { type: Number, default: 0 },
  lvl: { type: Number, default: 1 },
  hp: { type: Number, default: 0 },
  wp: { type: Number, default: 0 },
  kp: { type: Number, default: 0 },
  rank: { type: String, default: "Recruit" },
  nextXP: { type: Number, default: 100 * 1.25 },
  lastXP: { type: Number, default: 0 },
  totalXP: { type: Number, default: 0 },
  passwordChangedAt: Date,
  passwordRestToken: String,
  passwordResetExpiresAt: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.verifyPassword = async function (enteredPwd: string) {
  return await bcrypt.compare(enteredPwd, this.password);
};

userSchema.methods.changedPasswordAfter = function (JTWTimestamp: number) {
  let changedTimestamp: number;
  if (this.passwordChangedAt) {
    changedTimestamp = this.passwordChangedAt.getTime() / 1000;
  }
  return JTWTimestamp < changedTimestamp;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordRestToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
