import {productService} from "../service/index.js";

class ProductViewController {
    constructor() {
        this.productService = productService;
    }

    getProducts = async(req, res, next) => {
        let limit = req.query.limit ?? 6;
        let page = req.query.page ?? 1;
        let title = req.query.title && new RegExp(req.query.title, "i");
        
        try {
            const data = await this.productService.getProducts(limit, page, title);

            if(data) {
                return res.render(
                    "products", 
                    {
                    title: "Products",
                    products: data,
                    script: "public/js/pagination.js",
                    styles: "public/css/styles.css",
                    page: page,
                    }
                );
            }else{
                return res.status(404).json({
                    success: false,
                    message: `Not found`
                })
            }
    
        } catch (error) {
            next(error);
        }
    };
    getProduct = async(req, res, next) => {
        try {
            const {pid} = req.params
            let product = await this.productService.getProduct(pid);

            if(product) {
                let {title, description, code, price, thumbnail, stock} = product;

                return res.render(
                    "product", 
                    {
                        title,
                        description, 
                        code, 
                        price,
                        thumbnail,
                        stock,
                        styles: "../public/css/styles.css",
                        script: "../public/js/index.js"
                    },
                );
    
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
        const body = req.body;

        let thumbnail = "http://localhost:8080/public/images/" + body.thumbnail;
        body.thumbnail = thumbnail;
    
        try {
            let response = await this.productService.createProduct(newProduct);
            if(response) {
                return res.render(
                    "products", 
                    {
                      title: "Products",
                      products: response,
                      script: "public/js/index.js",
                      styles: "public/css/styles.css",
                    }
                );
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

}

export default ProductViewController;