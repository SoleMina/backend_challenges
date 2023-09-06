import { Router } from "express";
import User from "../../dao/Mongo/models/User.js";
import validator from "../../middlewares/validator.js";
import pass_is_8 from "../../middlewares/pass_is_8.js";
import passport from "passport";
import createHash from "../../middlewares/createHash.js";
import isValidPassword from "../../middlewares/isValidPassword.js";
import isAdmin from "../../middlewares/isAdmin.js";
import createToken from "../../middlewares/createToken.js";
import UserController from "../../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

//REGISTER
router.get("/users", userController.getUsers);
router.post("/register-user", validator, pass_is_8, createHash,
    passport.authenticate(
        "register", //nombre de la estrategia
        { failureRedirect: "/api/auth/fail-register"} //objeto de config de la ruta
    ),
    userController.registerUser
);

//REGISTER TRADITIONAL WAY
router.post("/register-new-user", validator, pass_is_8, createHash, async(req, res, next) => {
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
router.post("/login", 
    passport.authenticate("signin", {failureRedirect: "/api/auth/fail-signin"}),
    isValidPassword,
    createToken,
    userController.signIn
);

//SIGNOUT
router.post("/signout", 
    userController.signOut     
);

//FAILED PAGE
router.get("/fail-register",
    userController.failRegister
);

//LOGIN WITH GITHUB
router.get("/github", passport.authenticate("github", {scope: ["user: email"]}), (req, res) => {});

router.get(
    "/github/callback", passport.authenticate("github", {failureRedirect: "/api/auth/fail-register-github"}), //middleware con estrategia de auth de github
    (req, res) => res.status(200).redirect("/")
);
router.get("/fail-register-github", 
    userController.failRegisterGithub
);

//CURRENT
router.get("/current",
    createToken,
    userController.current
);

export default router;