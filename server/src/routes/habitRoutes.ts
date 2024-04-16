import express from "express";
import cors from "cors";
import { getAllHabits, createHabit } from "../controllers/habitController";
import { verifyJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

router.post("/", verifyJWT, createHabit);
router.get("/", verifyJWT, getAllHabits);

export default router;
