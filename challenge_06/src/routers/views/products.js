import { Router} from "express";
import manager from "../../classes/products.js";
import upload from "../../middlewares/multer.js";
import Product from "../../models/Product.js";

const router = Router();

router.get("/", async (req, res, next) => {
    let id = req.query.pid ?? null;
    let products = (await manager.getProducts()).products;
    try {
        return res.render(
            "products", 
            {
              title: "Products",
              products: products,
              id,
              script: "public/js/index.js",
              styles: "public/css/styles.css"
            }
        );
        
    } catch (error) {
        next(error);
    }
});
router.get("/:pid", async (req, res, next) => {
    try {
        let {pid: id} = req.params;
        id = Number(id);
        if(typeof id === "number" && id >= 0) {
            let product = (await manager.getProductById(id)).product;
            let {title, description, code, price, thumbnail, stock} = product;
            if(!product) return res.status(400).json({
                success: false,
                message: "Product not found"
            });
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
            return res.status(400).json({
                success: false,
                message: "Check id data, it should be a number!"
            })
        }
        
    } catch (error) {
        next(error);
    }
});

router.post("/", upload.single("imageFile"), async (req, res, next) => {
    try {
        const body = req.body;

        let thumbnail = "http://localhost:8000/public/images/" + req.file.filename;
        body.thumbnail = thumbnail;

        if(!body) {
            return res.status(400).json({
                success: false,
                message: "Cannot create product"
            });
        }
        const product = await Product.create(req.body);
        console.log(product);
        if(!product) {
            return res.status(400).json({
                success: false,
                message: "Cannot create product"
            });
        }
        let products = await Product.find();
        res.render("products", {
            
                title: "Products",
                products: products,
                script: "public/js/index.js",
                styles: "public/css/styles.css"
            
        });
    
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot create product: " + error
        })
    }
})

export default router;