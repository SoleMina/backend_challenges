import { Router} from "express";

const router = Router();

router.get("/register", async (req, res, next) => {
    try {
        return res.render(
          "register", 
          {
            title: "Register",
            script: "./public/register.js"
          }
        );
    } catch (error) {
        next(error);
    }
});

export default router;