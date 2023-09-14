import { Router } from "express";
import upload from "../../middlewares/multer.js";
import ProductController from "../../controllers/product.controller.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProduct);
router.post("/", upload.single("imageFile"), productController.createProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

export default router;
