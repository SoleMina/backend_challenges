import Product from "./models/Product.js";


class ProductDaoMongo {
    constructor() {
        this.productModel = Product;
    }

    getProducts = async() => {
        return await Product.find();
    };
    getProduct = async(pid) => {
        return await Product.findOne({_id: pid});
    };
    createProduct = async(pid) => {
        return await Product.create(newProduct);
    };
    updateProduct = async(pid, updProduct) => {
        return await Product.findByIdAndUpdate({_id: pid}, updProduct);
    };
    deleteProduct = async(pid) => {
        return await Product.findByIdAndDelete({_id: pid});
    }
}

// module.exports = {
//     ProductDaoMongo
// };

export default ProductDaoMongo;