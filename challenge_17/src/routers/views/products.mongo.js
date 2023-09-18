import { Router } from "express";
import upload from "../../middlewares/multer.js";
// import isAdmin from "../../middlewares/isAdmin.js";
import ProductViewController from "../../controllers/product-view.controller.js";

const router = Router();
const productViewController = new ProductViewController();

router.get("/", productViewController.getProducts);
router.get("/:pid", productViewController.getProduct);
router.post(
  "/",
  upload.single("imageFile"),
  productViewController.createProduct
);
router.put("/:pid", productViewController.updateProduct);
router.delete("/:pid", productViewController.deleteProduct);

export default router;
