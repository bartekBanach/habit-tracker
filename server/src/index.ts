import express from "express";
import router from "./routes/authRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to db."))
  .catch((err) => console.log("Error connecting to db.", err));

const app = express();
const port = process.env.PORT;

app.use("/", router);

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`,
  );
});
