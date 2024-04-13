import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  test,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/test", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", protect, getProfile);

export default router;
