import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import generateRefreshToken from '../utils/generateRefreshToken';
import AuthenticationError from '../errors/AuthenthicationError';
import ValidationError from '../errors/ValidationError';
import AggregateError from '../errors/AggregateError';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/;
  const errors: ValidationError[] = [];

  if (!username) {
    errors.push(new ValidationError('Username is required.', 'username'));
  }
  if (!passwordRegex.test(password)) {
    errors.push(
      new ValidationError('Password must be at least 8 characters long and contain at least one special character and one number', 'password'),
    );
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    errors.push(new ValidationError('User with this email already exists.', 'email'));
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    /*const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '10s' },
    );

    generateRefreshToken(res, user._id);

    res.status(201).json({
      accessToken,
    });*/

    res.status(201).json('User registered.');
  } else {
    throw new ValidationError('Invalid user data', '');
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
      { expiresIn: '10s' },
    );

    generateRefreshToken(res, user._id);

    res.status(201).json({
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const logoutUser = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
  });
  res.json({ message: 'Cookie cleared' });
};

const refresh = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    throw new AuthenticationError('Not authorized, no token');
  }

  const refreshToken = cookies.jwt;
  const decoded = verifyRefreshToken(refreshToken);
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new AuthenticationError('User not found');
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
    { expiresIn: '10s' },
  );

  res.json({ accessToken });
});

function verifyRefreshToken(refreshToken: string): { userId: string } {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string };
  } catch (error) {
    throw new AuthenticationError('Invalid or expired refresh token');
  }
}

export default verifyRefreshToken;

const getProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new AuthenticationError('User not authenticated');
  }

  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };

  res.status(200).json(user);
});

export { loginUser, logoutUser, registerUser, getProfile, refresh };
