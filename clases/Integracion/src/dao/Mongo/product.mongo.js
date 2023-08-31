import Product from "./models/Product.js";

class ProductDaoMongo {
    constructor() {
        this.model = Product;
    }
    get = async() => "get products"
    getBy = async() => "get By product"
    create = async() => "create product"
    update = async() => "update product"
    delete = async() => "delete product"

}

export default ProductDaoMongo;