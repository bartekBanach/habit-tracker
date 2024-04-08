import { Request, Response } from "express";
import User from "../models/user";
import { hashPassword, comparePasswords } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const test = (req: Request, res: Response) => {
  res.json("hello world");
};

export const registerUser = async (req: Request, res: Response) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/;

  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.json({ error: "Username is required." });
    }
    if (!passwordRegex.test(password)) {
      return res.json({
        error:
          "Password must be at least 8 characters long and contain at least one special character and one number",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ error: "Email is already taken." });
    }

    const hashedPassword = await hashPassword(password);
    console.log("hashed pass", hashedPassword);

    const user = User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (err) {
    console.log(err);
  }
  res.json("User registerred");
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return res.json({ error: "This user does not exist." });
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
};

export const getProfile = (req: Request, res: Response) => {
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
