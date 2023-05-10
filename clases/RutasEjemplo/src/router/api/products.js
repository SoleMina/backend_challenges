import { Router} from "express";
import manager from "../../managers/Products.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        // let content = body;
       return  res.json({status: "ok"});
    } catch (error) {
        next(error);
    }
    // let limit = req.query.limit ?? null;
    // let products = (await manager.getProducts()).products;
    // try {
    //     if(limit) {
    //         let productLimited = products.slice(0, limit);
    //         if(productLimited.length > 0) {
    //             return res.status(200).json({
    //                 success: true,
    //                 response: productLimited
    //             })
    //         }else{
    //             return res.status(400).json({
    //                 success: false,
    //                 message: "Products not found"
    //             })
    //         }
    //     }else{
    //         return res.status(200).json({
    //             success: true,
    //             response: products
    //         })
    //     }
    // } catch (error) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Products not found: " + error
    //     })
    // }
});

export default router;