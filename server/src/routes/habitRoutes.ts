import express from "express";
import cors from "cors";
import { getAllHabits, createHabit } from "../controllers/habitController";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

router.post("/", createHabit);
router.get("/", getAllHabits);

export default router;
