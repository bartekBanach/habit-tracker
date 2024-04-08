import express, { urlencoded } from "express";
import router from "./routes/authRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//db connection
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to db."))
  .catch((err) => console.log("Error connecting to db.", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const port = process.env.PORT;

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`,
  );
});
