import { Router } from "express";
import User from "../models/User.js";
import validator from "../middlewares/validator.js";
import pass_is_8 from "../middlewares/pass_is_8.js";
import create_hash from "../middlewares/create_hash.js";
import is_valid_password from "../middlewares/is_valid_password.js";
import passport from "passport";

const router = Router();

//REGISTER
router.post("/register", validator, pass_is_8, create_hash, 
    passport.authenticate(
        "register", //nombre de la estrategia
        { failureRedirect: "/api/auth/fail-register"} //objeto de config de la ruta
    ),
    (req, res) => res.status(201).json({
        success: true,
        message: "User created!"
    })
// async(req, res, next) => {
//     try {
//         await User.create(req.body);
//         return res.status(201).json({
//             success: true,
//             message: "User created!"
//         })
//     } catch (error) {
//         next(error);
//     }
// }
);

router.get("/fail-register", (req, res) => res.status(400).json({
    success: false,
    message: `Error auth`
}));

//SIGNIN
router.post("/login",
    pass_is_8,
    passport.authenticate("signin", {failureRedirect: "/api/auth/fail-signin"}),
    is_valid_password,
    (req, res, next) => {
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
    // async(req, res, next) => {
    // try {
    //     const {email} = req.body;
    //     const one = await User.findOne({email});
    //     if(one) {
    //         req.session.email = email;
    //         req.session.role = one.role;
    //         return res.status(200).json({
    //             success: true,
    //             message: `User signed in!`
    //         })
    //     }else{
    //         return res.status(404).json({
    //             success: false,
    //             message: `User not found!`
    //         })
    //     }
    // } catch (error) {
    //     next(error);
    // }
});

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