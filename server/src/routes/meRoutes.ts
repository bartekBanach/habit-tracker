import express from 'express';
import cors from 'cors';
import { getMyHabits } from '../controllers/meController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);

router.get('/habits', verifyJWT, getMyHabits);

export default router;
