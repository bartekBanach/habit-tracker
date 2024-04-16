import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  refresh,
  test,
} from "../controllers/authController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/test", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/refresh", refresh);
router.get("/profile", verifyJWT, getProfile);

export default router;
