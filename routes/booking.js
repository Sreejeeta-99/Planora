import express from "express";
import {createBooking,getBookings,updateBookingStatus,deleteBooking } from "../controller/booking.js";
import { authenticate_token } from "../middlewares/auth.js";


const router = express.Router();
router.post("/create", authenticate_token, createBooking);
router.get("/myBooking", authenticate_token, getBookings);
router.put("/update/:id", authenticate_token, updateBookingStatus);
router.delete("/delete/:id", authenticate_token, deleteBooking);
export default router;