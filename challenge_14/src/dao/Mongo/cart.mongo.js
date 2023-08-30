import Cart from "./models/Cart.js";
import { Types } from "mongoose";
import Product from "./models/Product.js";
 
class CartDaoMongo {
    constructor() {
        this.cartModel = Cart;
    }

    getCart = async() => { 
        return await Cart.aggregate([
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
    }

    getCartInformation = async (cid) => {
        return await Cart.aggregate([
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
    };

    getCartById = async (cid) => {
        return await Cart.findById(cid);
    };

    createCart = async (cart) => {
        console.log(cart, "mongo folder");
        return await Cart.create(cart);
    }
    updateCart = async (pid, cid, body) => {
        let product = await Product.findById(pid);
        let cartFound = await Cart.findById(cid);

        if(cartFound && product) {
            return await Cart.findByIdAndUpdate(cid, body);
        }
    }
}

export default CartDaoMongo;