import express from "express";
import { getAllTrips,getTripByID,filterTrips } from "../controller/public.js";

const router = express.Router();
router.get("/all-trips", getAllTrips);
router.get("/trip/:id", getTripByID);
router.get("/filter-trips", filterTrips);

export default router;