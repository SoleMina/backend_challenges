import { Router } from "express";
import ProductsController from "../controller/products.controller.js";

const router = Router();
const productController = new ProductsController();

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

router.get("/email", (req, res) => {
    sendMail("karina.pradogutierrez@gmail.com", "Mail de prueba", "<h1>Prueba email node</h1>")
    res.send("Mail enviado");
});

export default router;