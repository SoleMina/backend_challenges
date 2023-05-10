import { Router} from "express";
import carts from "../../managers/Carts.js";

const router = Router();

router.get("/", async (req, res) => {

    try {
        return res.json({statusCode: 200})
    } catch (error) {
        next(error);
    }
    // try {
    //     let totalCarts = (await carts.getCarts()).carts;
    //     console.log(totalCarts);
    //     if(totalCarts.length > 0) {
    //         return res.status(200).json({
    //             success: true,
    //             response: totalCarts
    //         })
    //     }else {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Carts not found"
    //         });
    //     }
    // } catch (error) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Cart not found: " + error
    //     })
    // }
});

export default router;