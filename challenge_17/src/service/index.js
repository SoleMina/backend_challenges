import ProductDaoMongo from "../dao/Mongo/products.mongo.js";
import UserDaoMongo from "../dao/Mongo/users.mongo.js";
import CartDaoMongo from "../dao/Mongo/cart.mongo.js";
import ProductRepository from "../repositories/product.repository.js";
import TicketDaoMongo from "../dao/Mongo/ticket.mongo.js";

//export const productService = new(ProductRepository(new ProductDaoMongo()));
export const productService = new ProductDaoMongo();
export const userService = new UserDaoMongo();
export const cartService = new CartDaoMongo();
export const ticketService = new TicketDaoMongo();
