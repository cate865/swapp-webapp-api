import { postProduct, markProductAsDelivered, viewProductsForDonation, viewProductsForTrade } from "../controllers/productController";
import express from 'express';

const productRouter = express.Router()

productRouter.post("/add", postProduct)
productRouter.post("/deliver", markProductAsDelivered)
productRouter.get("/trade", viewProductsForTrade)
productRouter.get("/donation", viewProductsForDonation)

export default productRouter