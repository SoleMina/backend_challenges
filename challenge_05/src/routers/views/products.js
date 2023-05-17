import { Router} from "express";
import manager from "../../classes/products.js";

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
              id
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
                    stock
                }
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

export default router;