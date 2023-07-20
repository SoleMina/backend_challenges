import passport from "passport";
import { Strategy } from "passport-local";
import GHStrategy from "passport-github2";
import User from "../dao/Mongo/models/User.js";
import jwt from "passport-jwt";

const { GH_APP_ID, GH_CLIENT_ID, GH_CLIENT_SECRET } = process.env;

const callback = "http://localhost:8080/api/auth/callback"

export default function() {
    passport.serializeUser(
        (user, done) => done(null, user._id)
    )
    passport.deserializeUser(
        async(id, done) => {
            const user = await User.findById(id);
            return done(null, user);
        }
    )
    passport.use(           //estrategia dde registro
        "register",         //nombre de la estrategia
        new Strategy(       //defino nueva estrategia local que recibe dos parametros
            { passReqToCallback: true, usernameField: "email" },
            //la primera propiedad es para tener acceso al objeto de req de la peticion
            //la segunda propiedad es para cambiar la prop principal, que en nuestro caso es email
            async(req, username, password, done) => { 
                try {
                    //let one = await User.findOne({ email: req.email})
                    let one = await User.findOne({ email: username})
                    if(one) {
                        return done(null, false);
                    }else{
                        let user = await User.create(req.body);
                        delete user.password;  //para el registro no es necesario continuar/inyectar a la propiedad user del obj de req
                        return done(null, user);
                    }
                    
                    
                } catch (error) {
                    console.log(error);
                    return done(error);
                }
            }
        )
    )
    passport.use(
        "login",
        new Strategy(
            {usernameField: "email"},
            async(username, password, done) => {
                try {
                    let one = await User.findOne({ email: username});
                    console.log(one);
                    if(one) {
                        return done(null, one);
                    }else{
                        return done(null, false);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    )
    //passport.use();  //estrategia de registro
    //passport.use();  //estrategia de inicio de sesion
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
    passport.use(   //estrategia solo sirve para autenticar usuarios
        "jwt",
        new jwt.Strategy(
            { secretOrKey: process.env.SECRET_JWT, jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req) => req?.cookies["token"]])},
            async(jwt_payload, done) => {
                //jwt_payload es el resultado del desencriptamiento del token
                //done siempre es el ultimo parámetro de la cb (siempre)
                try {
                    let one =  await User.findOne({ email: jwt_payload.email});
                    if(one) {
                        delete one.password;
                        return done(null, one);
                    }else{
                        return done(null, false);
                    }
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    )
}