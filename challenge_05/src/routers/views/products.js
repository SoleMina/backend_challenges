import { Router} from "express";

const router = Router();

router.get("/products", async (req, res, next) => {
    try {
        return res.render(
          "products", 
          {
            title: "Products"
          }
        );
    } catch (error) {
        next(error);
    }
});

export default router;