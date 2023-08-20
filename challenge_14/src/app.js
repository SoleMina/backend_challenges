import express from "express";
import morgan from 'morgan';
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import router from "./routers/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandlers from "./middlewares/notFoundHandlers.js";
import session from 'express-session';
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from 'passport';
import initializePassport from "./config/passport.js";
import MongoSingleton from "./config/mongoSingleton.js";
import { addLogger } from "./config/logger.js";
import path from 'path';
import dotenv from 'dotenv';
import config from "./config/configuration.js";

const envPath = path.join(__dirname, '..', '.env.development');
dotenv.config({
  path: envPath
});

const server = express();

//middlewares
server.use(session({
  secret: config.secret_session,
  resave: true,
  saveUninitialized: true,
  store: mongoStore.create({
      mongoUrl: config.mongo_url,
      ttl: 10000,
  })
}));

server.use(cookieParser(config.secret_cookie));
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use("/public", express.static("public"));
server.use(morgan('dev'));
// initializePassport();
server.use(passport.initialize());
server.use(passport.session());
server.use(addLogger);

//template engine
server.engine("handlebars", engine(
  {extname: 'handlebars', runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true}}));

server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");

//Endpoints
server.use("/", router);
server.use(errorHandler);
server.use(notFoundHandlers);

MongoSingleton.getInstance();

export default server;
