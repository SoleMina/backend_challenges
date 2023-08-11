import { Router} from "express";
// import productsRouter from "./products.js";
import authRouter from "./auth.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.mongo.js";
import registerRouter from "./carts.memory.js";
import {sendMail} from "../../utils/sendMail.js";
import {sendSms, sendWhatsapp} from "../../utils/sendSms.js";
import generateUserFaker from "../../utils/mocks/generateUserFaker.js";
import compression from "express-compression";
import UserController from "../../controllers/user.controller.js";

const router = Router();

const userController = new UserController();
//router.use(compression())

router.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}))

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use('/register',registerRouter);
router.use('/auth',authRouter);

router.get("/mail", async(req, res, next) => {
    try {
        await sendMail();
        res.send("Email enviado");
    } catch (error) {
       console.log(error);
    }
});
router.get("/sms", async(req, res, next) => {
    try {
        await sendSms("Karina", "Prado");
        res.send("SMS enviado");
    } catch (error) {
       console.log(error);
    }
});
router.get("/whatsapp", async(req, res, next) => {
    try {
        await sendWhatsapp("Karina", "Prado");
        res.send("Whatsapp enviado");
    } catch (error) {
       console.log(error);
    }
});
router.get("/mockuser", (req, res, next) => {
    try {
        let users = [];
        for(let i = 0; i < 100; i++) {
            users.push(generateUserFaker());
        }
        res.send({
            status: "success",
            payload: users
        });
    } catch (error) {
       console.log(error);
    }
});
router.get("/string", (req, res) => {
    let string = `Hola coders soy un string rídiculamente largo`;
    for(let i = 0; i<5e2; i++) {
        string += `Hello coders, soy un string largo`;
    }
    res.send(string);
});
router.post("/users", userController.registerUser);


export default router;