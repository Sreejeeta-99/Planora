import express from "express";
import { createBlog, fetchSingleBlog, getAllBlogs, updateBlog, deleteBlog} from "../controller/blog.js";
import { authenticate_token } from "../middlewares/auth.js";

const router = express.Router();
router.post("/create", authenticate_token, createBlog);
router.get("/fetch/",getAllBlogs);
router.get("/fetch/:id", fetchSingleBlog);
router.put("/update/:id", authenticate_token, updateBlog);
router.delete("/delete/:id",authenticate_token, deleteBlog);
export default router;
