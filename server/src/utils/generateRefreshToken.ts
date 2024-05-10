import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { Types } from 'mongoose';

const generateRefreshToken = (res: Response, userId: Types.ObjectId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateRefreshToken;
