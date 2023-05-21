import { Router} from "express";
import productsRouter from "./products.js";
import cartsRouter from "./carts.js";
import registerRouter from "./carts.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use('/register',registerRouter);

export default router;