import express from "express";
import { signup } from "../controller/auth.js";

const router = express.Router();
router.post("/register", signup);
export default router;
