function isAdmin (req, res, next) {
    try {
        const {email, password, role} = req.user;
        if(role === "admin") {
            console.log("entró");
            next();
        }
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
}

export default isAdmin;