import express from "express";
import { createBooking,getMyBookings } from "../controller/user.js";
import {authenticate_token} from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-Booking", authenticate_token, createBooking);
router.get("/get-My-Bookings", authenticate_token, getMyBookings);
export default router;
