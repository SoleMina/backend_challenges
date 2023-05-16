import { Router} from "express";

const router = Router();

router.get("/chat", async (req, res, next) => {
    try {
        return res.render(
            "chat", 
            {
              title: "Chat",
              styles: "css/styles.css",
              script: "/public/js/index.js"
            }
        );
        
    } catch (error) {
        next(error);
    }
});
