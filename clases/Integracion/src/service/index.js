import ProductDao from "../dao/factory.js";
import ProductRepository from "../repositories/products.repository.js";

const productService = new ProductRepository(new ProductDao());


export default productService;