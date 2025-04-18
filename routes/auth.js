import express from "express";
import { signup,login,forgotPassword,resetPassword } from "../controller/auth.js";

const router = express.Router();
router.post("/register", signup);
router.post("/login", login);
router.post("/forgot-Password",forgotPassword);
router.patch("/reset-Password/:id",resetPassword);
export default router;
