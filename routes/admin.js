import express from "express";
import { createTrip,updateTrip,deleteTrip,updateStatus} from "../controller/admin.js";
import { authenticate_token, checkAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.post("/create-trip", authenticate_token, checkAdmin, createTrip);
router.put("/update-trip/:id", authenticate_token, checkAdmin, updateTrip);
router.delete("/delete-trip/:id", authenticate_token, checkAdmin, deleteTrip);
router.put("/update-status/:bookingId", authenticate_token,checkAdmin, updateStatus);

export default router;
