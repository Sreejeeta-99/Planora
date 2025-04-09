import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_PORT],
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URL).then(()=>{console.log("database connected")});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));

