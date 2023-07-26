import ProductDaoMongo from "../dao/Mongo/products.mongo.js";
import UserDaoMongo from "../dao/Mongo/users.mongo.js";

export const productService = new ProductDaoMongo();
export const userService = new UserDaoMongo();
