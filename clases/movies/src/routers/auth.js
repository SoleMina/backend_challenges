import { Router } from "express";
import User from "../models/User.js";
import validator from "../middlewares/validator.js";
import pass_is_8 from "../middlewares/pass_is_8.js";

const router = Router();

//REGISTER
router.post("/register", validator, pass_is_8, async(req, res, next) => {
    try {
        await User.create(req.body);
        return res.status(201).json({
            success: true,
            message: "User created!"
        })
    } catch (error) {
        next(error);
    }
});

//SIGNIN
router.post("/signin", async(req, res, next) => {
    try {
        const {email} = req.body;
        const one = await User.findOne({email});
        if(one) {
            req.session.email = email;
            req.session.role = one.role;
            return res.status(200).json({
                success: true,
                message: `User signed in`
            })
        }else{
            return res.status(404).json({
                success: false,
                message: `User not found`
            })
        }
    } catch (error) {
        next(error);
    }
})

//SIGNOUT
router.post("/signout", async(req, res, next) => {
    try {
        req.session.destroy();
        return res.status(200).json({
            success: true,
            message: `User signed out!`
        })
    } catch (error) {
        next(error);
    }
})

export default router;