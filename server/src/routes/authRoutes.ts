import express from "express";
import cors from "cors";
import {
  registerUser,
  loginUser,
  getProfile,
  test,
} from "../controllers/authController";

const router = express.Router();

/*router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);*/

router.get("/test", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

export default router;
