import { Router} from "express";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

const router = Router();


//GETS
router.get("/", async (req, res, next) => {
    try {
        let totalCarts = await Cart.find();
        console.log(totalCarts, "totalCarts");
        if(totalCarts) {
            return res.render(
                "carts", 
                {
                  title: "Carts",
                  carts: totalCarts[0]
                }
              );
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

//POSTS
router.post("/",  async (req, res) => {
    try {
        let obj = await Cart.create(req.body);
        console.log(obj, "cart posted");
        if(obj) {
            res.status(200).json({
                success: true,
                response: obj
            })
        }else {
            return res.status(404).json({
                success: false,
                message: "Cannot create cart"
            })
        }
    } catch (error) {
        next(error);
    }
});

export default router;