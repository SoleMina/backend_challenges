import { compareSync  } from "bcrypt-nodejs";
import User from "../dao/Mongo/models/User.js";

export default async function(req, res, next) {

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