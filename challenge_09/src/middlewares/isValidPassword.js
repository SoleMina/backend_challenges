import { compareSync  } from "bcrypt-nodejs";
import User from "../models/User.js";

export default async function(req, res, next) {

    console.log(req.body.password, "req.body.password");
    console.log(req.user.password, "req.user.password");

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