import productService from "../service/index.js";


class ProductsController {

    constructor() {
        this.service = productService;
    }
    
    getProducts = (req, res) => {
        res.send("Send products");
    }
    getProductById = (req, res) => {
        const {pid} = req.params;
    
        res.send({
            status: success,
            payload: pid
        });
    }
    createProduct = (req, res) => {
        const {pid} = req.params;
        
        res.send({
            status: success,
            message: "post"
        });
    }
    updateProduct = (req, res) => {
        const {pid} = req.params;
        
        res.send({
            status: success,
            message: "put"
        });
    }
    deleteProduct = (req, res) => {
        const {pid} = req.params;
        
        res.send({
            status: success,
            message: "delete"
        });
    }
}

export default ProductsController;