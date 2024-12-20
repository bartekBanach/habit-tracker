/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/CustomError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error in error handling middleware:', err, 'status', res.statusCode);
  console.log('constructor', err.constructor);
  console.log('proto', Object.getPrototypeOf(err));

  if (err instanceof CustomError) {
    //return res.status(err.errorCode).json({ errors: err.serializeErrors() });

    return res.status(err.errorCode).json({ errors: err.serializeErrors() });
  }

  /*res.status(res.statusCode).json({
    errors: [{ message: 'An unexpected error occurred!' }],
    //stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });*/
  return res.status(res.statusCode).json({ errors: [{ message: 'An unexpected error occurred!' }] });
};

export default errorHandler;
