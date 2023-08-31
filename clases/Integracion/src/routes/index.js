import { Router } from "express";
import routerProducts from "./products.router.js";

const router = Router();

router.use("/api/products", routerProducts);

export default router;