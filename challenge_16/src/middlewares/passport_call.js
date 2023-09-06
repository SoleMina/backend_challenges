import passport from "passport"

export default (strategy)=> {
    return async(req,res,next)=> {
        passport.authenticate(
            strategy,
            (err,user,info)=> {
                if(err) {
                    next(err)
                }
                console.log(info, "info")
                console.log(user, "user")
                console.log(err, "err")
                if(!user) {
                    console.log(info, "info")
                    return res.status(401).json({
                        error: info.toString()
                    })
                }
                req.user = user;
                return next()
            }
        )(req,res,next);
    }
}