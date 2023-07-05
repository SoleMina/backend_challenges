function isAdmin (req, res, next) {
    try {
        const {email, password} = req.user;
        if(email == "admin@admin.com") {
            console.log("entró");
            next();
        }
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
}

export default isAdmin;