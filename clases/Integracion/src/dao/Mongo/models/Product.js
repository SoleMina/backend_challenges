import { Schema, model } from "mongoose";

const collection = "products";

let productSchema = new Schema({
    title: {type: String, required: true},
    description: { type:String,required:true },
    thumbnail: { type:String,required:true },
    price: { type:Number,required:true },
    stock: { type:Number,required:true }
});

let Product = model(collection, productSchema);

export default Product;