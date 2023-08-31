import { config } from "../config/config.js";
import ProductDaoMongo from "./Mongo/product.mongo.js";

let ProductDao;

switch (config.persistence) {
    case "MONGO":
        //config.dbConnection();
        //ProductDao = await import("./Mongo/product.mongo.js");
        ProductDao = ProductDaoMongo;
        break;
    default:
        break;
}

export default ProductDao;