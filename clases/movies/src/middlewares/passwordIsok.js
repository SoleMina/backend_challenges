import bcrypt from "bcryptjs";

export default (req, res, next) => {
    try {
        let db_password = req.user.password;
        let form_password = req.body.password;
        let compare = bcrypt.compare(form_password, db_password);
        console.log(compare);
        if(compare) {
            return next();
        }else{
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!"
            })
        }

    } catch (error) {
        next(error);
    }
}