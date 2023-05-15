import { Router } from "express";

const router = Router();

router.get("/chat", (req, res, next) => {
    try {
        return res.render(
            "chat", 
            {
              title: "Coder chat",
              script: "chat.js"
            }
        );
    } catch (error) {
        next(error);
    }
});

export default router;