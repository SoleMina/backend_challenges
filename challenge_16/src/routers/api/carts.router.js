import { Router} from "express";
import CartController from "../../controllers/cart.controller.js";

const router = Router();
const cartController = new CartController();

//GETS
router.get("/", cartController.getCart);

router.get("/bills/:cid", cartController.getCartInformation);

router.get("/:cid", cartController.getCartById);

//POSTS
router.post("/",  cartController.createCart);
router.post("/:cid/purchase",  cartController.purchaseCart);

//PUTS
router.put("/:cid/product/:pid/:units", cartController.updateCart);

export default router;