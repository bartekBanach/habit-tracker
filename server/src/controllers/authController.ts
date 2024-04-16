import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import generateRefreshToken from "../utils/generateRefreshToken";

const test = asyncHandler(async (req: Request, res: Response) => {
  res.status(404);
  throw new Error("Test route try error handling");
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/;

  if (!username) {
    res.status(400);
    throw new Error("Username is required.");
  }
  if (!passwordRegex.test(password)) {
    res.status(400);
    throw new Error(
      "Password must be at least 8 characters long and contain at least one special character and one number",
    );
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
    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "10s" },
    );

    generateRefreshToken(res, user._id);

    res.status(201).json({
      accessToken,
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
    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "10s" },
    );

    generateRefreshToken(res, user._id);

    /*const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" },
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });*/

    res.status(201).json({
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
  res.json({ message: "Cookie cleared" });
};

const refresh = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "10s" },
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, invalid token");
  }
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

export { loginUser, logoutUser, registerUser, getProfile, refresh, test };
