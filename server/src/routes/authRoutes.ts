import express from "express";
import { test } from "../controllers/authControllers";
import cors from "cors";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: "localhost:5173",
  }),
);

router.get("/", test);

export default router;
