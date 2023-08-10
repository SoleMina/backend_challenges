import { Router} from "express";
// import productsRouter from "./products.js";
import authRouter from "./auth.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.mongo.js";
import registerRouter from "./carts.memory.js";
import {sendMail} from "../../utils/sendMail.js";
import {sendSms, sendWhatsapp} from "../../utils/sendSms.js";

const router = Router();

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


export default router;