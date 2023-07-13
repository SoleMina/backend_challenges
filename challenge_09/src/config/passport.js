import passport from "passport";
import { Strategy } from "passport-local";
import GHStrategy from "passport-github2";
import User from "../models/User.js";

const { GH_APP_ID, GH_CLIENT_ID, GH_CLIENT_SECRET } = process.env;

const callback = "http://localhost:8080/api/auth/callback"

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
                    let one = await User.findOne({ email:username })  ;
                    console.log(one);
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
    passport.use(    //estrategia de registro con github
        "github",
        new GHStrategy(
            { clientID: GH_CLIENT_ID, clientSecret: GH_CLIENT_SECRET, callbackUrl: callback }, //objeto de configuración
            async(accessToken, refreshToken, profile, done) => {   //cb que depende de la respuesta de github, la propiedad más importante que es el profile
                try {
                    console.log(profile);
                    let one =  await User.findOne({ email: profile._json.login}) //los datos del usuario vienen del github(la propiedad profile no del form)
                    if(one) {                       //si encuentro un usuario
                        return done(null, one);     //inyecto la prop req.user con los datos
                    }
                    let user = await User.create({
                        name: profile._json.name,
                        email: profile._json.login,
                        password: "1234",
                        photo: profile._json.avatar_url,
                        age: 18
                    })
                    return done(null, user);   //inyecto el user recién creado en prop req.user
                } catch (error) {
                    return done(error);
                }
            }
        )
    ); 
}