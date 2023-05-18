import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
    try {
        return res.render('register', {
            title: "register",
            styles: "css/styles.css",
            script: "public/js/index.js",
        });
    } catch (error) {
        next(error);
    }
});

export default router;