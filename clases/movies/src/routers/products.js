import { Router } from "express";
import Product from "../dao/Mongo/models/Product.js";
import passport from "passport";
import password_call from "../middlewares/password_call.js";
import ProductDaoMongo from "../dao/Mongo/product.mongo.js";

let router = Router();
const productDao = new ProductDaoMongo();

router.get("/", password_call("jwt"), async(req, res, next) => {

    //passport.authenticate("jwt", {session: false})
    try {
        let products = await productDao.getProducts();
        if(products.length > 0) {
            return res.status(200).json({
                success: true,
                products: products
            });
        }
    } catch (error) {
        next(error);
    }
});

router.post("/", password_call("jwt"), async(req, res, next) => {
    try {
        const newProduct = req.body;
        let result = await productDao.createProduct(newProduct);

        return res.status(200).json({
            success: true,
            products: result
        });
    } catch (error) {
        next(error);
    }
});

export default router;