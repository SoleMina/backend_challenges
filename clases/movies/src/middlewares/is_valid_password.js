import { compareSync } from "bcrypt";
import User from "../models/User.js";

export default async function(req, res, next) {
    let user = await User.findOne({email: req.body.email});
    if(user) {
        let verified = compareSync(
            req.body.password,
            user.password
        )
        if(verified) {
            return next();
        }else{
            return res.status(401).json({
                success: false,
                message: `User not found`
            })
        }
    }
}