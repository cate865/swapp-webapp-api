import { makeTradeOffer, acceptOffer } from "../controllers/offerController.js";
import express from 'express'
import { authenticate } from "../middlewares/auth.js";
import upload from "../middlewares/fileConfig.js";

const offerRouter = express.Router()

offerRouter.post("/create", authenticate, upload.array('images'), makeTradeOffer)
offerRouter.get("/accept/:id", authenticate, acceptOffer)

export default offerRouter