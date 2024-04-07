import { Request, Response } from "express";
import User from "../models/user";
import { hashPassword, comparePasswords } from "../helpers/auth";

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

    const hashedPassword = hashPassword(password);

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
