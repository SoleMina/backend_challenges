import {hashSync, genSaltSync} from "bcrypt-nodejs";

export default function(req, res, next) {
    const {password} = req.body;

    const hashPassword = hashSync(
        password,       
        genSaltSync()
    );
    
    req.body.password = hashPassword;
    return next();
}