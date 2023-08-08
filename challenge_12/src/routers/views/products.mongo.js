import { Router} from "express";
import Product from "../../dao/Mongo/models/Product.js";
import upload from "../../middlewares/multer.js";
import isAdmin from "../../middlewares/isAdmin.js";
import ProductViewController from "../../controllers/product-view.controller.js";

const router = Router();
const productViewController = new ProductViewController();


router.get("/", isAdmin, productViewController.getProducts);
router.get("/:pid", productViewController.getProduct);
router.post("/", upload.single("imageFile"), productViewController.createProduct);
router.put("/:pid", productViewController.updateProduct);
router.delete("/:pid", productViewController.deleteProduct);

export default router;