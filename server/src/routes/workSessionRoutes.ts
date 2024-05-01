import express from "express";
import {
  createWorkSession,
  getAllWorkSessions,
  getWorkSessionsByTimePeriod,
} from "../controllers/workSessionController";

const router = express.Router();

router.post("/", createWorkSession);
router.get("/", getAllWorkSessions);
router.get("/by-time-period", getWorkSessionsByTimePeriod);

export default router;
