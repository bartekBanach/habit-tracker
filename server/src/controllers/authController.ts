import { Request, Response } from "express";
import User from "../models/user";
import { comparePasswords } from "../utils/auth";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";

const test = asyncHandler(async (req: Request, res: Response) => {
  res.status(404);
  throw new Error("Test route try error handling");
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/;

  if (!username) {
    res.json({ error: "Username is required." });
    return;
  }
  if (!passwordRegex.test(password)) {
    res.json({
      error:
        "Password must be at least 8 characters long and contain at least one special character and one number",
    });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

const getProfile = (req: Request, res: Response) => {
  if (req.user) {
    const user = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    };
    res.status(200).json(user);
  }
};

export { loginUser, logoutUser, registerUser, getProfile, test };
