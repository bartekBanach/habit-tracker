import express from 'express';
import { registerUser, loginUser, logoutUser, getProfile, refresh } from '../controllers/authController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/refresh', refresh);
router.get('/profile', verifyJWT, getProfile);

export default router;
