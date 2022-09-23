import { postProduct, markProductAsDelivered, viewProductsForDonation, viewProductsForTrade } from "../controllers/productController.js";
import express from 'express';
import { authenticate } from "../middlewares/auth.js";
import upload from "../middlewares/fileConfig.js";

const productRouter = express.Router()

productRouter.post("/add", authenticate, upload.array('images'), postProduct)
productRouter.post("/deliver/:id", authenticate, markProductAsDelivered)
productRouter.get("/trade", authenticate, viewProductsForTrade)
productRouter.get("/donation", authenticate, viewProductsForDonation)

export default productRouter