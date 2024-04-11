import { Request, Response } from "express";
import User from "../models/user";
import { hashPassword, comparePasswords } from "../helpers/auth";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const test = asyncHandler(async (req: Request, res: Response) => {
  res.status(404);
  throw new Error("Test route try error handling");
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/;

  try {
    const { username, email, password } = req.body;

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

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.json({ error: "Email is already taken." });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      res.json({ error: "This user does not exist." });
      return;
    }
    const match = await comparePasswords(password, user.password);

    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, username: user.username },
        process.env.JWT_SECRET as string,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        },
      );
    }

    if (!match) {
      res.json({ error: "Passwords do not match." });
    }
  } catch (err) {
    console.log(err);
  }
});

const getProfile = (req: Request, res: Response) => {
  const { token } = req.cookies;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

export { loginUser, registerUser, getProfile, test };
