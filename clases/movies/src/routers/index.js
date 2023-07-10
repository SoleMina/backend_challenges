import { Router } from "express";
import auth_router from "./auth.js";
import products_router from "./products.js";

const router = Router();
router.use("/auth", auth_router);
router.use("/products", products_router);

export default router;