import jwt from "jsonwebtoken";
import config from "../config/configuration.js";

export default (req, res, next) => {
    let token = jwt.sign(
        {email: req.body.email},
        config.secret_jwt,
        { expiresIn: 60*60*24*7 }
    )
    req.token = token;
    console.log(token, "token");

    return next();
}