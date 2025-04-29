import express from "express";
import { createBooking,getMyBookings,getBookingById} from "../controller/user.js";
import {authenticate_token} from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-Booking", authenticate_token, createBooking);
router.get("/get-My-Bookings", authenticate_token, getMyBookings);
router.get("/get-Booking-By-Id/:bookingId", authenticate_token, getBookingById);
export default router;
