import { Router} from "express";
// import productsRouter from "./products.js";
import authRouter from "./auth.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.mongo.js";
import registerRouter from "./carts.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use('/register',registerRouter);
router.use('/auth',authRouter);

export default router;