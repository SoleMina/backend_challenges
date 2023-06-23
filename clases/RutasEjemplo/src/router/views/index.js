import { Router} from "express";
import authRouter from "./register.js";
import loginRouter from "./login.js";
const router = Router();

router.use("/", authRouter);
router.use("/", loginRouter);
//Add carts and products router here

router.get("/", (req, res, next) => {
    try {
       return res.render(
        "index", 
        //null
        {
            name: 'Sole',
            last_name: 'Gutierrez',
            alumnos: [
                {
                    name:'Ana',
                    photo: 'https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg'
                },
                { 
                    name: 'Maria',
                    photo: 'https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg'
                },
                {
                    name: 'Karla',
                    photo: 'https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg'
                }
            ],
            title: "index",
            script: "./public/connection.js"
        }
       )
    } catch (error) {
        next(error);
    }
});

export default router;