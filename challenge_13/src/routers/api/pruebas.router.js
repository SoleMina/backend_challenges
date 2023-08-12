import { Router} from "express";
import UserController from "../../controllers/user.controller.js";
import {sendMail} from "../../utils/sendMail.js";
import {sendSms, sendWhatsapp} from "../../utils/sendSms.js";
import generateUserFaker, { generateMockProducts } from "../../utils/mocks/generateUserFaker.js";

const userController = new UserController();

const router = Router();

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


export default router;