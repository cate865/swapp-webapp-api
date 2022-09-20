import { userSignUp, userLogin, viewProfile } from "../controllers/usersController";
import express from "express";

const userRouter = express.Router()

userRouter.post("/signup",userSignUp)
userRouter.post("/login", userLogin)
userRouter.get("/profile", viewProfile)

export default userRouter