import { Router} from "express";
import Product from "../../dao/Mongo/models/Product.js";
import upload from "../../middlewares/multer.js";
import isAdmin from "../../middlewares/isAdmin.js";
import ProductDaoMongo from "../../dao/Mongo/products.mongo.js";
import ProductController from "../../controllers/product.controller.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProduct);
router.post("/", upload.single("imageFile"), productController.createProduct);
router.put("/:pid", productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

export default router;