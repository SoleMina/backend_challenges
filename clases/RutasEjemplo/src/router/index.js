import { Router} from "express";
import api_router from "./api";

const router = Router();
router.use("/", api_router);

router.get("./test", (req, res) => {
    res.json({status: "ok"});
})

export default router;

//enrutador principal de la aplicación