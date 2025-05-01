import express from "express";
import { createProduct, updateProduct, deleteProduct, getAllProducts,getProductById, filterProducts } from "../controller/product.js";
import { authenticate_token, checkAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.post("/create-Product", authenticate_token, checkAdmin, createProduct);
router.put("/update-Product/:id", authenticate_token, checkAdmin, updateProduct);
router.delete("/delete-Product/:id",authenticate_token,checkAdmin,deleteProduct);
router.get("/get-All-Products", getAllProducts);
router.get("/get-Product-By-Id/:id", getProductById);
router.get("/filter", filterProducts);
export default router;;
