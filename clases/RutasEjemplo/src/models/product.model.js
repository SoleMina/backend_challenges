import {model, Schema} from "mongoose";

let collection = "products";

let schema = new Schema({
    title: {type: String, required: true}, //cada prioridad necesita referir tipo de dato
    description: {type: String, required: true},
    stock: {type: Number, required: true},
    url_photo: {type: String, required: true},
    code: {type: String, required: true},
    price: {type: Number, required: true}
});

let Product = model(collection, schema);

export default Product;