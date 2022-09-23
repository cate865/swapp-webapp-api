import User from "../models/user.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config()

// Create User Account

export async function userSignUp(req, res) {
    try {
        bcrypt.hash(req.body.password, 10).then(async (hash) => {
            let userObj = {
                email: req.body.email,
                password: hash,
                name: req.body.name
            }
            let user = await User.create(userObj);
            if (user) {
                res.status(200).json({
                    success: true,
                    message: 'User created successfully',
                    data: user
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'User could not be created at this time'
                })
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong...check error log for details"
        })
    }
}

// Login to User Account

export async function userLogin(req, res) {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res(500).json({
                success: false,
                message: "User not found"
            })
        }
        bcrypt.compare(req.body.password, user.password).then(response => {
            if (!response) {
                return res.status(401).json({
                    status: false,
                    message: "Authentication Failed: Incorrect password."
                })
            }

            let authToken = jwt.sign({ email: user.email, _id: user._id },
                // eslint-disable-next-line no-undef
                process.env.AUTH_KEY, { expiresIn: "1h" });

            return res.status(200).json({
                status: true,
                message: "User authentication successful",
                user: { name: user.name, email: user.email, _id: user._id },
                token: authToken,
                expiresIn: 3600
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Oopss! Something is wrong..."
        })
    }

}

// View Profile

export async function viewProfile(req, res) {
    try {
        let user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: "true",
            message: "User Found successfilly",
            data: user
        })

    }
    catch (error) {
        return res.status(500).json({
            message: "Oops...something went wrong"
        })

    }

}


