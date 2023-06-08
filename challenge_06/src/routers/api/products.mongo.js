import { Router} from "express";
import Product from "../../models/Product.js";

const router = Router();

router.get("/", async(req, res, next) => {
    try {
        let products = new Product.find();
        if(products) {
            return res.status(200).json({
                success: true,
                products: products
            })
        }else{
            return res.status(404).json({
                success: false,
                message: `Not found`
            })
        }
    } catch (error) {
        next(error);
    }
});
router.get("/:pid", async(req, res, next) => {
    try {
        let one = await Product.findById(req.params.pid);
        if(one) {
            return res.status(200).json({
                success: true,
                product: one
            })
        }else{
            return res.status(404).json({
                success: false,
                message: `Product not found`
            })
        }
    } catch (error) {
        next(error);
    }
});
router.post("/", async(req, res, next) => {
    try {
        let response = await Product.create(req.body);
        if(response) {
            return res.status(200).json({
                success: true,
                message: `Product created!`
            })
        }else {
            return res.status(404).json({
                success: false,
                message: `Couldn't create product!`
            })
        }
    } catch (error) {
        next(error);
    }
});
router.put("/:pid", async(req, res, next) => {
    try {
        let response = await Product.findByIdAndUpdate(req.params.pid, req.body, {new:true});
        if(response) {
            return res.status(200).json({
                success: true,
                message: `Product updated!`,
                response: response
            })
        }else{
            return res.status(404).json({
                success: false,
                message: `Product not found`
            })
        }
    } catch (error) {
        next(error);
    }
});
router.delete("/:pid", async(req, res, next) => {
    try {
        let response = await Product.findByIdAndDelete(req.params.pid);

        if(response) {
            return res.status(200).json({
                success: true,
                message: `Product updated!`,
                response: response
            })
        }else{
            return res.status(404).json({
                success: false,
                message: `Product not found`
            })
        }
        
    } catch (error) {
        next(error);
    }
});

export default router;