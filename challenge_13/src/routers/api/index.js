import { Router} from "express";
// import productsRouter from "./products.js";
import authRouter from "./auth.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.mongo.js";
import registerRouter from "./carts.memory.js";
import compression from "express-compression";
import pruebasRouter from "./pruebas.router.js";

const router = Router();

//router.use(compression())

router.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}))

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use('/register',registerRouter);
router.use('/auth',authRouter);
router.use('/',pruebasRouter);


export default router;