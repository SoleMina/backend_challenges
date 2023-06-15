import { Router } from "express";
import User from "../models/User.js";

let router = Router();

router.post("/", async(req, res, next) => {
    try {
        let one = await User.create(req.body);
        return res.status(201).json({
            success: true,
            message: `User id=${one._id} created`
        })
    } catch (error) {
        next(error);
    }
});

export default router;