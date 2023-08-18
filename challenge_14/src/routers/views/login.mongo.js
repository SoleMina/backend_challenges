import { Router} from "express";
import User from "../../dao/Mongo/models/User.js";

const router = Router();

router.get("/",  async(req, res, next) => {
    try {
        return res.render(
            "login", 
            {
              title: "Login",
              script: "public/js/login.js",
              styles: "public/css/styles.css",
            }
        );
    } catch (error) {
        next(error);
    }
});

router.post("/", async(req, res, next) => {
    try {
        const {email} = req.body;
        const one = await User.findOne({email});
        if(one) {
            req.session.email = email;
            req.session.role = one.role;
            return res.render(
                "products", 
                {
                  title: "products",
                  styles: "public/css/styles.css",
                }
            );
        }else{
            return res.status(404).json({
                success: false,
                message: `User not found!`
            })
        }
    } catch (error) {
        next(error);
    }
});

router.post("/signout", async(req, res, next) => {
    try {
        req.session.destroy();
        return res.render(
            "login", 
            {
              title: "Login",
              script: "public/js/login.js",
              styles: "public/css/styles.css",
            }
        );
    } catch (error) {
        next(error);
    }
});
router.get("/signout", async(req, res, next) => {
    try {
        req.session.destroy();
        return res.render(
            "login", 
            {
              title: "Login",
              script: "public/js/login.js",
              styles: "public/css/styles.css",
            }
        );
    } catch (error) {
        next(error);
    }
});
export default router;