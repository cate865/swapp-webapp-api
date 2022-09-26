import { userSignUp, userLogin } from "../controllers/usersController.js";
import express from "express";


const userRouter = express.Router()

userRouter.post("/signup", userSignUp)
userRouter.post("/login", userLogin)


export default userRouter