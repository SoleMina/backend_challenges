import { Router} from "express";

const router = Router();

router.get("/chat", async (req, res, next) => {
    try {
        return res.render(
            "chat", 
            {
              title: "Chat",
            }
        );
        
    } catch (error) {
        next(error);
    }
});
