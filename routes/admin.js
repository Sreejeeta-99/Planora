import express from "express";
import { createTrip} from "../controller/admin.js";
import { authenticate_token, checkAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.post("/create-trip", authenticate_token, checkAdmin, createTrip);
export default router;
