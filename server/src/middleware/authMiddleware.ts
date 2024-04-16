import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Response } from "express";
import { Request } from "express";
import User from "../models/user";

interface UserInfo {
  _id: string;
  username: string;
  email: string;
}

interface AccessJWTPayload {
  UserInfo: UserInfo;
}

const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization || req.headers.Authorization;

    authHeader = Array.isArray(authHeader) ? authHeader[0] : authHeader;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
      ) as AccessJWTPayload;
      req.user = await User.findById(decoded.UserInfo._id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  },
);

export { verifyJWT };
