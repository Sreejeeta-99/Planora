import express from "express";
import { createTrip,updateTrip,deleteTrip,updateStatus,getAllBookings,fetchBookingById} from "../controller/admin.js";
import { authenticate_token, checkAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.post("/create-trip", authenticate_token, checkAdmin, createTrip);
router.put("/update-trip/:id", authenticate_token, checkAdmin, updateTrip);
router.delete("/delete-trip/:id", authenticate_token, checkAdmin, deleteTrip);
router.put("/update-status/:bookingId", authenticate_token,checkAdmin, updateStatus);
router.get("/all-bookings", authenticate_token, checkAdmin, getAllBookings);
router.get("/booking/:id", authenticate_token, checkAdmin, fetchBookingById);

export default router;
