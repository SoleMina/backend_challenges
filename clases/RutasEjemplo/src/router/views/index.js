import { Router} from "express";

const router = Router();

router.get("/views", (req, res) => {
    res.json({endpoint: "views"})
});

export default router;