import { Router} from "express";
import UserController from "../../controllers/user.controller.js";
import {sendMail} from "../../utils/sendMail.js";
import {sendSms, sendWhatsapp} from "../../utils/sendSms.js";
import generateUserFaker, { generateMockProducts } from "../../utils/mocks/generateUserFaker.js";
import { logger } from "../../config/logger.js";

const userController = new UserController();

const router = Router();

router.get("/mail", async(req, res, next) => {
    try {
        const email = "karina.pradogutierrez@gmail.com";
        await sendMail(email, "Reset Password", "Reset Password in a secure way");
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

router.post("/users", userController.registerUser);

router.get("/mockingproducts", async (req, res) => {
    try {
        let products = await generateMockProducts();
        res.send({
            success: true,
            payload: products
        });
    } catch (error) {
        next(error);
    }
});

router.get("/logger", (req, res, next) => {
    try {
        //req.logger.warn("This is a warn");
        req.logger.error(`This is an error - ${Date().toLocaleString()}`);
        res.send("Logger registrado");
    } catch (error) {
        next(error);
    }
});
router.get("/logger-test", (req, res, next) => {
    try {
        if(process.env.NODE_ENV = "development") {
            logger.debug(`This is a debug`);
            res.send("Logger registrado as debug");
        }else {
            logger.info(`This is an info`);
            res.send("Logger registrado as info");
        }
    } catch (error) {
        next(error);
    }
});


export default router;