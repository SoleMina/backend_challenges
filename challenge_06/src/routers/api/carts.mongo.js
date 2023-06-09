import { Router} from "express";
import Cart from "../../models/Cart";

const router = Router();

//GETS
router.get("/", async (req, res, next) => {
    try {
        let totalCarts = await Cart.find();
        console.log(totalCarts);
        if(totalCarts) {
            return res.status(200).json({
                success: true,
                response: totalCarts
            })
        }else {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;