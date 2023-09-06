import { Router} from "express";
import authRouter from "./auth.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import compression from "express-compression";
import pruebasRouter from "./pruebas.router.js";
import emailRouter from "./email.router.js";

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
router.use('/auth',authRouter);
router.use('/',pruebasRouter);
router.use('/',emailRouter);


export default router;