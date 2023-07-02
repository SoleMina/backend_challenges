import express from "express";
import "dotenv/config.js";
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

const server = express();

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
connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

export default server;
