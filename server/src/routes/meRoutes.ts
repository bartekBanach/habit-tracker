import express from 'express';
import { getMyHabits } from '../controllers/meController';
import { getMyTimers } from '../controllers/meController';
import { getMyGoals } from '../controllers/meController';
import { getMyWorkSessions } from '../controllers/meController';
import { updateMyPreferences } from '../controllers/meController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/habits', verifyJWT, getMyHabits);
router.get('/timers', verifyJWT, getMyTimers);
router.get('/goals', verifyJWT, getMyGoals);
router.get('/work-sessions', verifyJWT, getMyWorkSessions);
router.put('/preferences', verifyJWT, updateMyPreferences);

export default router;
