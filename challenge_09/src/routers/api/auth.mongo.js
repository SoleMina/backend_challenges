import { Router } from "express";
import User from "../../models/User.js";
import validator from "../../middlewares/validator.js";
import pass_is_8 from "../../middlewares/pass_is_8.js";
import passport from "passport";
import createHash from "../../middlewares/createHash.js";

const router = Router();

//REGISTER
router.post("/register-user", validator, pass_is_8, createHash, async(req, res, next) => {
    try {
        let body = req.body;
        if(body.photo.length<2) {
            body.photo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rQTfvDS0mK_Y09wABdP_UOwfxiuQLqWcUQ&usqp=CAU"
        }
        await User.create(body);
        return res.status(201).json({
            success: true,
            message: "User created!"
        })
    } catch (error) {
        next(error);
    }
});

//SIGNIN
router.post("/login", async(req, res, next) => {
    try {
        const {email} = req.body;
        console.log(req.body, "req.body");
        const one = await User.findOne({email});
        console.log(one, "one");
        if(one) {
            req.session.email = email;
            req.session.role = one.role;
            return res.status(200).json({
                success: true,
                message: `User signed in!`
            })
        }else{
            return res.status(404).json({
                success: false,
                message: `User not found!`
            })
        }
    } catch (error) {
        next(error);
    }
})

//SIGNOUT
router.post("/signout", async(req, res, next) => {
    try {
        req.session.destroy();
        return res.status(200).json({
            success: true,
            message: `User signed out!`
        })
    } catch (error) {
        next(error);
    }
});

//FAILED PAGE
router.get("/fail-register", (req, res) => res.status(400).json({
    success: false,
    message: `Error auth`
}));

//LOGIN WITH GITHUB
router.get("/github", passport.authenticate("github", {scope: ["user: email"]}), (req, res) => {});
router.get(
    "/github/callback", passport.authenticate("github", {failureRedirect: "/api/auth/fail-register-github"}), //middleware con estrategia de auth de github
    (req, res) => res.status(200).redirect("/")
);
router.get("/fail-register-github", (req, res) => res.status(403).json({
    success: false,
    message: "bad auth"
}));

export default router;