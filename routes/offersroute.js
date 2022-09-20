import { makeTradeOffer, respondToOffer } from "../controllers/offerController";
import express from 'express'

const offerRouter = express.Router()

offerRouter.post("/create", makeTradeOffer)
offerRouter.post("/respond", respondToOffer)

export default offerRouter