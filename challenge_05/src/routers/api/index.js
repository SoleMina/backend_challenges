import { Router} from "express";
import productsRouter from "./products.js";
import cartsRouter from "./carts.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);

export default router;