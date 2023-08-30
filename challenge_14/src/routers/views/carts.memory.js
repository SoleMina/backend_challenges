import { Router} from "express";
import carts from "../../dao/Memory/cart.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        let id = Number(1);
        if(id) {
            const obj = (await carts.getCartById(id)).cartId;
            return res.render(
                "carts", 
                {
                  title: "Carts",
                  carts: obj
                }
              );
        }else {
            return res.status(400).json({
                success: false,
                message: "Cart not found!"
            })
        }
        
    } catch (error) {
        next(error);
    }
});

export default router;