import ProductDaoMongo from "./Mongo/products.mongo.js";
import ProductDaoMemory from "./Memory/products.memory.js";
import UsersDaoMongo from "./Mongo/users.mongo.js";
import CartDaoMongo from "./Mongo/cart.mongo.js";

const persistence = process.env.persistence;
console.log(persistence);

let ProductDao;
let UsersDao;
let CartDao;

switch (persistence) {
    case "MONGO":
        ProductDao =  ProductDaoMongo;
        UsersDao = UsersDaoMongo;
        CartDao = CartDaoMongo;
        break;
    case "MEMORY":
        ProductDao =  ProductDaoMemory;
        break;
    case "FILE":
        break;
}

export default {ProductDao, UsersDao, CartDao};