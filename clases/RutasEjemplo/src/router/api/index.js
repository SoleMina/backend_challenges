import { Router} from "express";
//import products_router from "./products.js";
import products_router from "./products.mongo.js";
import students_router from "./students.mongo.js";
import carts_router from "./carts.js";
import auth_Router from "./auth.js";
import cookies_Router from "./cookies.js";
import session_Router from "./sessions.js";

const router = Router();

// router.get("/products", (req, res) => {
//     res.json({endpoint: "api"})
// });

router.use("/products", products_router);
router.use("/students", students_router);
router.use("/carts", carts_router);
router.use("/auth", auth_Router);
router.use("/cookies", cookies_Router);
router.use("/session", session_Router);

export default router;
//El enrutador principal de la api (para enviar datos)
//aca SOLAMENTE llamo al enrutador de los recursos (product/cart/user)