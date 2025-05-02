import express from "express";
import {addToWishlist, getWishlist, removeFromWishlist} from "../controller/wishlist.js";
import { authenticate_token } from "../middlewares/auth.js";

const router = express.Router();
router.post("/add-to-wishlist", authenticate_token, addToWishlist);
router.get("/get-wishlist",authenticate_token,getWishlist);
router.delete("/remove-from",authenticate_token,removeFromWishlist);
export default router;
