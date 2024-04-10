// routes/activityRoutes.ts
import express from "express";
import {
  createActivity,
  getAllActivities,
} from "../controllers/activityController";

const router = express.Router();

// Route to create a new activity
router.post("/", createActivity);

// Route to get all activities
router.get("/", getAllActivities);

export default router;
