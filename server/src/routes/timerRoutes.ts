import express from 'express';
import { createTimer, getTimersByUser, updateTimer, deleteTimer } from '../controllers/timerController';

const router = express.Router();

router.post('/', createTimer);
router.get('/:id', getTimersByUser);
router.put('/:id', updateTimer);
router.delete('/:id', deleteTimer);

export default router;
