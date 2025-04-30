import express from "express";
import { createProduct } from "../controller/product.js";
import { authenticate_token, checkAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.post("/create-Booking", authenticate_token, checkAdmin, createProduct);
export default router;
