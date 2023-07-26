import ProductDaoMongo from "../dao/Mongo/products.mongo.js";
import UserDaoMongo from "../dao/Mongo/users.mongo.js";
import CartDaoMongo from "../dao/Mongo/cart.mongo.js";

export const productService = new ProductDaoMongo();
export const userService = new UserDaoMongo();
export const cartService = new CartDaoMongo();
