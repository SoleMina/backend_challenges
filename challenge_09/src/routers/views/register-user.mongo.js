import { Router} from "express";
import pass_is_8 from "../../middlewares/pass_is_8.js";
import validator from "../../middlewares/validator.js";
import createHash from "../../middlewares/createHash.js";
import isAdmin from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/",  async(req, res, next) => {
    try {
        return res.render(
            "registeruser", 
            {
              title: "Register User",
              script: "public/js/registeruser.js",
              styles: "public/css/styles.css",
            }
        );
    } catch (error) {
        next(error);
    }
});

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
export default router;