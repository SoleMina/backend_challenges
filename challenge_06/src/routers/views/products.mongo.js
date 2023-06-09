import { Router} from "express";
import Product from "../../models/Product.js";

const router = Router();

router.get("/", async(req, res, next) => {
    let id = req.query.pid ?? null;
    try {
        let products = await Product.find().lean();
        console.log(products);
        if(products) {
            return res.render(
                "products", 
                {
                  title: "Products",
                  products: products,
                  script: "public/js/index.js",
                  styles: "public/css/styles.css",
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
});
router.get("/:pid", async(req, res, next) => {
    try {
        let {pid: id} = req.params;
        console.log(id, "pid");
        let one = await Product.findById(id);
        console.log(one, "one");
        if(one) {
            let {title, description, code, price, thumbnail, stock} = one;
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
});
router.post("/", async(req, res, next) => {
    try {
        let response = await Product.create(req.body);
        if(response) {
            return res.status(200).json({
                success: true,
                message: `Product created!`
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
});
router.put("/:pid", async(req, res, next) => {
    try {
        let response = await Product.findByIdAndUpdate(req.params.pid, req.body, {new:true});
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
});
router.delete("/:pid", async(req, res, next) => {
    try {
        let response = await Product.findByIdAndDelete(req.params.pid);

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
});

export default router;