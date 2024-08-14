import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IUser } from "types/userTypes";

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

const User = mongoose.model("User", userSchema);
export default User;
