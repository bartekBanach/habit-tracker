import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/CustomError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.send({ errors: err.serializeErrors() });
  }

  res.send({ errors: [{ message: 'Error occured!' }] });
};
export default errorHandler;
