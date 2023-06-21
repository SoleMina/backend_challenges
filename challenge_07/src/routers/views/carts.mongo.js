import { Router} from "express";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import { Types } from "mongoose";

const router = Router();


//GETS
router.get("/", async (req, res, next) => {
    try {
        let totalCarts = await Cart.aggregate([
            { $lookup: { foreignField: "product_id", from: "products", localField: "product_id", as: "product_id"}}, //populeo los datos del usuario

            { $replaceRoot: { //reemplazo la ubicacion de los elementos del array populado
                newRoot: {
                    $mergeObjects: [
                        { $arrayElemAt: [ "$product_id", 0]},
                        "$$ROOT"
                    ]
                }
            }},
            { $project: { product_id: 0, title: 0, price: 0, __v: 0}}, //limpia el objeto
        ]);
        if(totalCarts) {
            return res.render(
                "carts", 
                {
                  title: "Carts",
                  carts: totalCarts[0]
                }
              );
        }else{
            return res.status(404).json({
                success: true,
                message: `Not found`
            })
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