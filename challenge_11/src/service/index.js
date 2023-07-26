import ProductDaoMongo from "../dao/Mongo/products.mongo.js";

const productService = new ProductDaoMongo();

export default productService;