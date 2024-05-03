import express from 'express';
import { createWorkSession, getAllWorkSessions, getWorkSessionsByTimePeriod } from '../controllers/workSessionController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', createWorkSession);
router.get('/', getAllWorkSessions);
router.get('/by-time-period', verifyJWT, getWorkSessionsByTimePeriod);

export default router;
