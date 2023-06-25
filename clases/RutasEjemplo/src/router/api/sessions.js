import {Router} from "express";

const router = Router();

router.get("/", async(req, res) => {
    return res.status(200).json({
        success: true,
        message: req.session.email
    });
    // if(!req.session.counter) {req.session.counter = 1}
    // else {req.session.counter++}
    // return res.status(200).json({
    //     message: `Han ingresado ${req.session.counter} usuarios`
    // })
});

router.post("/login", async(req, res, next) => {
    try {
        const {email} = req.body;
        req.session.email = email;
        console.log(req.session.email, "req.session.email");
        return res.status(200).json({
            success: true,
            message: `${email} ha iniciado sesión`
        })
    } catch (error) {
        next(error)
    }
});
router.post("/signout", async(req, res, next) => {
    try {
        req.session.destroy();
        return res.status(200).json({
            message: "Ha cerrado sesión"
        })
    } catch (error) {
       next(error); 
    }
});

export default router;
