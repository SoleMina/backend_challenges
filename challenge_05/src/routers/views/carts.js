import { Router} from "express";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        return res.render(
          "carts", 
          {
            title: "Carts"
          }
        );
    } catch (error) {
        next(error);
    }
});

export default router;