import express from "express";
import morgan from 'morgan';
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import router from "./routers/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandlers from "./middlewares/notFoundHandlers.js";
import { connect } from "mongoose";
import session from 'express-session';
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from 'passport';
import initializePassport from "./config/passport.js";
import MongoSingleton from "./config/mongoSingleton.js";
import { addLogger } from "./config/logger.js";
import commander from "./utils/commander.js";
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.join(__dirname, '..', '.env.development');
console.log(envPath, "testtttt");

dotenv.config({
  path: envPath
});
const server = express();

// console.log(commander.opts());
// const { mode } = commander.opts();
// dotenv.config({
//   path: mode === "development" ? "./env.development" : "./env.production"
// })

// for (const key in process.env) {
//   console.log(`${key}: ${process.env[key]}`);
// }

//middlewares
server.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  store: mongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 10000,
  })
}));
server.use(cookieParser(process.env.SECRET_COOKIE));
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

//database

// connect(process.env.MONGO_URL)
//   .then(() => console.log("database connected"))
//   .catch(err => console.log(err));
MongoSingleton.getInstance();

export default server;
