import { Router} from "express";
import authRouter from "./register.js"
import cartsRouter from "./carts.mongo.js";
// import productsRouter from "./products.js";
import productsRouter from "./products.mongo.js";
import chatsRouter from "./chat.js";
import loginRouter from "./login.mongo.js";
import registeruserRouter from "./register-user.mongo.js";

const router = Router();

router.use("/carts", cartsRouter);
router.use("/products", productsRouter);
router.use("/", chatsRouter);
router.use('/register', authRouter);
router.use('/login', loginRouter);
router.use('/register-user', registeruserRouter);


router.get("/", (req, res, next) => {
    try {
        return res.render('index', {
            name: 'Sole',
            last_name: 'Gutierrez',
            products: [
                {
                    name:'Ana',
                    photo: 'https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg'
                },
                { 
                    name: 'Maria',
                    photo: 'https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg'
                }
            ],
            title: "index",
            styles: "css/styles.css",
            script: "public/js/index.js"
        });
    } catch (error) {
        next(error);
    }
});

export default router;