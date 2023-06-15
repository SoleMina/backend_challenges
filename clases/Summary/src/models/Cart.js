import { model, Schema, Types} from "mongoose";

let collection = "carts";

let schema = new Schema({
    user_id: {type: Types.ObjectId, required: true, ref: "users", index: true},
    movie_id: {type: Types.ObjectId, required: true, ref: "movies"},
    quantity: {type: Number, required: true},
    active: {type: Boolean}
});

schema.pre(
    "find",  //method mongoose when you use it will populate
    function() {
        this.populate("user_id", "name - _id")
        this.populate("movie_id", "title - _id")
    }
);

let Cart = model(collection, schema);

export default Cart;