/* eslint-disable no-unused-vars */
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
