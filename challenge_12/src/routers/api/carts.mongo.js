import { Router} from "express";
import Cart from "../../dao/Mongo/models/Cart.js";
import Product from "../../dao/Mongo/models/Product.js";
import { Types } from "mongoose";

const router = Router();

//GETS
router.get("/", async (req, res, next) => {
    try {
        const uid = "649329d5a25c8f354e1439a7";
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
            { $set: { total: { $multiply: ["$quantity", "price"] }}}, //multiplicar precio x cantidad
            { $project: { product_id: 0, title: 0, quantity:0, price: 0, __v: 0}}, //limpia el objeto

        ]);


        console.log(totalCarts, "totalCarts");
        if(totalCarts) {
            return res.status(200).json({
                success: true,
                response: totalCarts
            })
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

router.get("/bills/:cid", async (req, res, next) => {
    try {
        const cid = req.params.cid;
        let totalCarts = await Cart.aggregate([
            { $match: {_id: new Types.ObjectId(cid) }}, //filtro carritos por usuario
            { $lookup: { foreignField: "product_id", from: "products", localField: "product_id", as: "product_id"}}, //populeo los datos del usuario
            { $replaceRoot: { //reemplazo la ubicacion de los elementos del array populado
                newRoot: {
                    $mergeObjects: [
                        { $arrayElemAt: [ "$product_id", 0]},
                        "$$ROOT"
                    ]
                }
            }},
            { $set: { total: { $multiply: ["$quantity", "$price"] }}}, //multiplicar precio x cantidad
            //{ $project: { products: 0, title: 0, quantity:0, price: 0, __v: 0}},
            { $project: { product_id: 0, title: 0, quantity:0, price: 0, __v: 0}}, //limpia el objeto
            { $group: {_id: "$products", sum: { $sum: "$total"}}}, //agrupo y reduzco
            { $project: {products: 0, products: "$_id", sum: "$sum"}},

        ]);

        console.log(totalCarts, "totalCarts");
        if(totalCarts) {
            return res.status(200).json({
                success: true,
                response: totalCarts
            })
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
router.get("/:cid", async (req, res) => {
    try {
        const one = await Cart.findById(req.params.cid);
        if(obj) {
            res.status(200).json({
                success: true,
                response: one
            })
        }else{
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }
    } catch (error) {
        next(error);
    }
});

//POSTS
router.post("/",  async (req, res, next) => {
    try {
        let obj = await Cart.create(req.body);
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

//PUTS
router.put("/:cid/product/:pid/:units", async (req, res) => {
    try {
        let product = await Product.findById(req.params.pid);
        let cartFound = await Cart.findById(req.params.cid);

        if(cartFound && product) {
            let obj = await Cart.findByIdAndUpdate(req.params.cid, req.body);
            if(obj) {
                return res.status(200).json({
                    success: true,
                    response: obj
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: "Cannot update cart"
                })
            }
        }else {
            return res.status(440).json({
                success: false,
                message: "Cannot update cart"
            })
        }
        
    } catch (error) {
        next(error);
    }
});

export default router;