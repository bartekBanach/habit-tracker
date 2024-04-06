import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

export const userModel = mongoose.model("User", userSchema);
