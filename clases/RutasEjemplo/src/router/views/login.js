import { Router} from "express";

const router = Router();

router.get("/login", async (req, res, next) => {
    try {
        return res.render(
          "login", 
          {
            title: "Login",
            script: "./public/login.js"
          }
        );
    } catch (error) {
        next(error);
    }
});

export default router;