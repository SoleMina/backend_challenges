import {Router} from "express";

const router = Router();

//para setear una cookie ( con firma configurar en app la clave secreta)
router.get("/set", (req, res) => {
    return res.status(200).cookie(
        "nombre_de_la_clave",
        "objeto",
        {
            maxAge: 20000, 
            signed: true
        }
    ).json({
        success: true,
        message: "Cookie seteada"
    })
});

//para leer una cookie sin firma
router.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        cookies: req.cookies
    })
});
//para leer una cookie con firma
router.get("/get", (req, res) => {
    return res.status(200).json({
        success: true,
        cookies: req.signedCookies
    })
});

//para setear una cookie ( con firma configurar en app la clave secreta)
router.get("/set/:email", (req, res) => {
    const {email} = req.params;
    return res.status(200).cookie(
        "user",
        email,
        {
            maxAge: 60000, 
            signed: true
        }
    ).json({
        success: true,
        message: "Cookie seteada"
    })
});

export default router;
