import { model, Schema, Types } from "mongoose";

let collection = "carts";

let schema = new Schema({
    products: [{
        product: {type: Types.ObjectId, ref: "products", required: true},
        quantity: { type: Number, required: true}
    }]
});
const Cart = model(collection, schema);

export default Cart;