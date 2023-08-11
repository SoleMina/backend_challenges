// import ProductDaoMongo from "../dao/Mongo/products.mongo";
import {productService} from "../service/index.js";

class ProductController {
    constructor() {
        //this.productDao = new ProductDaoMongo();
        this.productService = productService;
    }

    getProducts = async(req, res, next) => {
        //return await Product.find();
        let limit = req.query.limit ?? 6;
        let page = req.query.page ?? 1;
        let title = req.query.title && new RegExp(req.query.title, "i");
        
        try {

            const data = await this.productService.getProducts(limit, page, title);
            if(data) {
                console.log(data);
                return res.status(200).json({
                    success: true,
                    products: data
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: `Not found`
                })
            }
    
        } catch (error) {
            return res.status(200).json({
                    success: true,
                    products: docs
                })
        }
    };
    getProduct = async(req, res, next) => {
        try {
            const {pid} = req.params
            let product = await this.productService.getProduct(pid);
            if(one) {
                return res.status(200).json({
                    success: true,
                    payload: product
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: `Product not found`
                })
            }
        } catch (error) {
            next(error);
        }
    };
    createProduct = async(req, res, next) => {
        const newProduct = req.body;
    
        console.log(req.file, "req.file");
        let thumbnail = "http://localhost:8080/public/images/" + body.thumbnail;
        body.thumbnail = thumbnail;
    
        try {
            let response = await this.productService.createProduct(newProduct);
            if(response) {
                return res.status(200).json({
                    success: true,
                    message: `Product created!`,
                    payload: response
                })
            }else {
                return res.status(404).json({
                    success: false,
                    message: `Couldn't create product!`
                })
            }
        } catch (error) {
            next(error);
        }
    };
    updateProduct = async(req, res, next) => {
        try {
            const {pid}  = req.params;
            let response = await this.productService.updateProduct(pid, req.body);
            if(response) {
                return res.status(200).json({
                    success: true,
                    message: `Product updated!`,
                    response: response
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: `Product not found`
                })
            }
        } catch (error) {
            next(error);
        }
    };
    deleteProduct = async(req, res, next) => {
        try {
            const {pid} = req.params;
            let response = await this.productService.deleteProduct(pid);
    
            if(response) {
                return res.status(200).json({
                    success: true,
                    message: `Product deleted!`,
                    response: response
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: `Product not found`
                })
            }
            
        } catch (error) {
            next(error);
        }
    };

}

export default ProductController;