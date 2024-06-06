import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { NextFunction, Response } from 'express';
import { Request } from 'express';
import User from '../models/user';
import AuthenticationError from '../errors/AuthenthicationError';

interface UserInfo {
  _id: string;
  username: string;
  email: string;
}

interface AccessJWTPayload {
  UserInfo: UserInfo;
}

const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers.authorization || req.headers.Authorization;

  authHeader = Array.isArray(authHeader) ? authHeader[0] : authHeader;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AuthenticationError('Not authorized, no token');
  }

  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as AccessJWTPayload;
  req.user = await User.findById(decoded.UserInfo._id).select('-password');

  if (!req.user) {
    throw new AuthenticationError('Not authorized, invalid token');
  }

  next();
});

export { verifyJWT };
