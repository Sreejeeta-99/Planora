import express from "express";
import { getRooms} from "../controller/room.js";

import { authenticate_token } from "../middlewares/auth.js";

const router = express.Router();
router.get("/getRooms", getRooms);
export default router;