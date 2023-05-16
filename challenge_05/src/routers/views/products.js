import { Router} from "express";
import manager from "../../classes/products.js";

const router = Router();

router.get("/", async (req, res, next) => {
    let products = (await manager.getProducts()).products;
    try {
        return res.render(
            "products", 
            {
              title: "Products",
              products: products
            }
        );
        
    } catch (error) {
        next(error);
    }
});

export default router;