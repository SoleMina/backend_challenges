import express from 'express';
import 'dotenv/config.js';
import morgan from 'morgan';
import error_handler from './middlewares/error_handler.js';
import not_found_handler from './middlewares/not_found_handler.js';
import router from './routers/index.js';
import session from 'express-session';
import mongoStore from "connect-mongo";
import passport from 'passport';
import initializePassport from './config/passport-gh.js';
import cookieParser from 'cookie-parser'

const server = express();

//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE));
server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 10000
    })
}));
server.use('/public',express.static('public'));
server.use('/',express.static('public'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(morgan('dev'));
initializePassport();
server.use(passport.initialize());
server.use(passport.session());

//endpoints
server.use("/api", router);
server.use(error_handler);
server.use(not_found_handler);

export default server;