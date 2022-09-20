import userRouter from "./usersRoute";
import productRouter from "./productsRoute";
import offerRouter from "./offersroute";
import express from 'express'

const router = express.Router()

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/offers', offerRouter)

export default router