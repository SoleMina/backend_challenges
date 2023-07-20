import { compareSync } from "bcrypt";
import User from "../dao/Mongo/models/User.js";

export default async function(req, res, next) {
    //password inyecta al requerimiento el obj user con los datos encontrado en mongo
    //let user = await User.findOne({email: req.body.email});

    let verified = compareSync(
        req.body.password,
        req.user.password
    )
    if(verified) {
        return next();
    }
    return res.status(401).json({
        success: false,
        message: `Auth error`
    })
}