import { userSignUp, userLogin, viewProfile } from "../controllers/usersController.js";
import express from "express";
import { authenticate } from "../middlewares/auth.js";

const userRouter = express.Router()

userRouter.post("/signup", userSignUp)
userRouter.post("/login", userLogin)
userRouter.get("/profile", authenticate, viewProfile)

export default userRouter