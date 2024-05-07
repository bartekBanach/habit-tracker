import express from 'express';
import { createWorkSession, getAllWorkSessions, getWorkSessionsByTimePeriod, deleteAllWorkSessions } from '../controllers/workSessionController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', createWorkSession);
router.get('/', getAllWorkSessions);
router.get('/by-time-period', verifyJWT, getWorkSessionsByTimePeriod);
router.get('/delete-all', deleteAllWorkSessions);

export default router;
