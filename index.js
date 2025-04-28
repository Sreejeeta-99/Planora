import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";

import authRouter from "./routes/auth.js";
import blogRouter from "./routes/blog.js";
import adminRouter from "./routes/admin.js";
import publicRouter from "./routes/public.js";
import userRouter from "./routes/user.js";

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_PORT],
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("database connected");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/public", publicRouter);
app.use("/api/v1/user", userRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
