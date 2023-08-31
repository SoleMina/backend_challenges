import { Router} from "express";
// import productsRouter from "./products.js";
import productsRouter from "./products.mongo.js";
import cartsRouter from "./carts.mongo.js";
import registerRouter from "./carts.js";
import authRouter from "./auth.mongo.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use('/register',registerRouter);
router.use('/auth',authRouter);

export default router;