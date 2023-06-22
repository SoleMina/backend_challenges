import { model, Schema, Types } from "mongoose";

let collection = "carts";

let schema = new Schema({
    products: [{
        product_id: {type: Types.ObjectId, ref: "products", required: true},
        quantity: { type: Number, required: true}
    }]
});

schema.pre(
    "find",  //method mongoose when you use it will populate
    function() {
        this.populate("products")
    }
);

const Cart = model(collection, schema);

export default Cart;