import { Router } from "express";
import Product from "../models/Product.js";
import passport from "passport";
import password_call from "../middlewares/password_call.js";

let router = Router();

router.get("/", password_call("jwt"), async(req, res, next) => {

    //passport.authenticate("jwt", {session: false})
    try {
        let products = await Product.find();
        if(products.length > 0) {
            return res.status(200).json({
                success: true,
                products: products
            })
        }
    } catch (error) {
        next(error);
    }
});

export default router;