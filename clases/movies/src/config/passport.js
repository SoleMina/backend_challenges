import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User.js";

export default  function initializePassport() {
    passport.serializeUser(
        (user, done) => done(null, user._id)
    )
    passport.deserializeUser(
        async(id, done) => {
            const user = await User.findById(id);
            return done(null, user);
        }
    )
    passport.use(
        "register",
        new Strategy(
            { passReqToCallback: true, usernameField: "email"}, //objeto de requerimientos
            async (req, username, password, done) => {
                try {
                    //buscar un usuario
                    let one = await User.findOne({ email: username}) //puedo buscar req.body.email
                    if(!one) {
                        let user = await User.create(req.body)
                        console.log(user, "user");
                        return done(null, user);
                    }
                    return done(null, false);
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    )
    passport.use(
        'signin',
        new Strategy(
            { usernameField:'email' },
            async (username,password,done) => {
                try {
                    //va a buscar un usuario
                    let one = await User.findOne({ email:username })    
                    if (one) {
                        return done(null,one)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    
    )
}