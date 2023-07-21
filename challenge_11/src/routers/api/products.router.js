import { Router} from "express";
import Product from "../../dao/Mongo/models/Product.js";
import upload from "../../middlewares/multer.js";
import isAdmin from "../../middlewares/isAdmin.js";
import ProductDaoMongo from "../../dao/Mongo/products.mongo.js";
import {getProducts, 
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct} from "../../controllers/product.controller.js";

const router = Router();
const productDao = new ProductDaoMongo();

router.get("/", isAdmin, getProducts);
router.get("/:pid", getProduct);
router.post("/", upload.single("imageFile"), createProduct);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;