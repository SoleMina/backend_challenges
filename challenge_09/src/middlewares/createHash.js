import {hashSync, genSaltSync} from "bcrypt";

export default function(req, res, next) {
    const {password} = req.body;

    const hashPassword = hashSync(
        password,       //defino la constraseña a hashear
        genSaltSync() //defino nivel de protección
    );
    
    req.body.password = hashPassword;
    return next();
}