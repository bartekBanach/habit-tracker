import express from "express";
import {
  createWorkSession,
  getAllWorkSessions,
} from "../controllers/workSessionController";

const router = express.Router();

// Route to create a new activity
router.post("/", createWorkSession);

// Route to get all activities
router.get("/", getAllWorkSessions);

export default router;
