import { Router} from "express";
import products_router from "./products.js";
import carts_router from "./carts.js";

const router = Router();

// router.get("/products", (req, res) => {
//     res.json({endpoint: "api"})
// });

router.use("/products", products_router);
router.use("/carts", carts_router);

export default router;
//El enrutador principal de la api (para enviar datos)
//aca SOLAMENTE llamo al enrutador de los recursos (product/cart/user)