import { Router} from "express";

const router = Router();

router.get("/api", (req, res) => {
    res.json({endpoint: "api"})
});

export default api_router;
//El enrutador principal de la api (para enviar datos)