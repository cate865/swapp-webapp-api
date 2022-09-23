import userRouter from "./usersRoute.js";
import productRouter from "./productsRoute.js";
import offerRouter from "./offersroute.js";
import express from 'express'

const router = express.Router()

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/offers', offerRouter)

export default router