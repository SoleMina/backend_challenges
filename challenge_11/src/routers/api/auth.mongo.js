import { Router } from "express";
import User from "../../dao/Mongo/models/User.js";
import validator from "../../middlewares/validator.js";
import pass_is_8 from "../../middlewares/pass_is_8.js";
import passport from "passport";
import createHash from "../../middlewares/createHash.js";
import isValidPassword from "../../middlewares/isValidPassword.js";
import isAdmin from "../../middlewares/isAdmin.js";
import createToken from "../../middlewares/createToken.js";

const router = Router();

//REGISTER
router.post("/register-user", validator, pass_is_8, createHash,
    passport.authenticate(
        "register", //nombre de la estrategia
        { failureRedirect: "/api/auth/fail-register"} //objeto de config de la ruta
    ),
    (req, res) => res.status(201).json({
        success: true,
        message: "User created!"
    })
);

//SIGNIN
router.post("/login", 
    passport.authenticate("signin", {failureRedirect: "/api/auth/fail-signin"}),
    isValidPassword,
    createToken,
    async(req, res, next) => {
    try {
        const {email} = req.body;
        req.session.email = email;
        req.session.role = req.user.role;
            return res.status(200).json({
                success: true,
                message: `User signed in!`
            })
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