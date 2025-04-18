import express from "express";
import {createBooking,getBookings } from "../controller/booking.js";
import { authenticate_token } from "../middlewares/auth.js";


const router = express.Router();
router.post("/create", authenticate_token, createBooking);
router.get("/myBooking", authenticate_token, getBookings);
export default router;