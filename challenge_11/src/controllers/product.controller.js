import ProductDaoMongo from "../dao/Mongo/products.mongo";

class ProductController {
    constructor() {
        this.productDao = new ProductDaoMongo();
    }

    getProducts = async(req, res, next) => {
        try {
            const {
                docs, 
                hasPrevPage, 
                hasNextPage, 
                prevPage, 
                nextPage, 
                totalDocs
            } = await this.productDao.getProducts();
    
        } catch (error) {
            return res.status(200).json({
                    success: true,
                    products: docs
                })
        }
    }
    getProduct = async(req, res, next) => {
        try {
            const {pid} = req.params
            let product = await this.productDao.getProduct(pid);
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
    }
    createProduct = async(req, res, next) => {
        const newProduct = req.body;
    
        console.log(req.file, "req.file");
        let thumbnail = "http://localhost:8080/public/images/" + body.thumbnail;
        body.thumbnail = thumbnail;
    
        try {
            let response = await this.productDao.createProduct(newProduct);
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
            let response = await this.productDao.updateProduct(pid, req.body);
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
            let response = await this.productDao.deleteProduct(pid);
    
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

export default new ProductController();