import { Router} from "express";
import authRouter from "./register.js"
import cartsRouter from "./carts.mongo.js";
import passport from "passport";
import productsRouter from "./products.mongo.js";
import chatsRouter from "./chat.js";
import emailRouter from "./email.mongo.js";
import loginRouter from "./login.mongo.js";
import registeruserRouter from "./register-user.mongo.js";
import createToken from "../../middlewares/createToken.js";

const router = Router();

router.use("/carts", cartsRouter);
router.use("/products", productsRouter);
router.use("/", chatsRouter);
router.use("/", emailRouter);
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

//CURRENT
router.get("/current",
    createToken,
    async(req, res, next) => {
        try {
            const user = req.user.name;
            const role = req.user.role;
            const token = req.token;
                return res.status(200).cookie('token',req.token,{maxAge:60*60*1000}).json({
                    success: true,
                    message: `Current state: user:${user}, role: ${role} and token: ${token}`
                })
        } catch (error) {
            next(error);
        }
});
export default router;