import express from "express";
import { createBlog } from "../controller/blog.js";
import { authenticate_token } from "../middlewares/auth.js";

const router = express.Router();
router.post("/create",authenticate_token,createBlog);
export default router;