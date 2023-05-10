import { Router} from "express";
import api_router from "./api/index.js";
import view_router from "./views/index.js";

const router = Router();
router.use("/api", api_router);
//Todas las rutas de la api rest van a tener el endpoint /api
router.use("/", view_router);
//mientras que todas las rutas de las vistas van a tener el endpoint (/) libre

router.get("/test", (req, res) => {
    console.log("object");
    res.json({status: "ok"});
})

export default router;

//enrutador principal de la aplicación
//aca SOLAMENTE llamo al enrutador de la API
//y al enrutador de la vista