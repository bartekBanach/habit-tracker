import express from "express";
import cors from "cors";
import { test, registerUser } from "../controllers/authControllers";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

router.get("/", test);
router.post("/register", registerUser);

export default router;
