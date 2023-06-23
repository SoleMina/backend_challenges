import express from "express";
import router from "./router/index.js";
import "dotenv/config.js";
import errorHandler from "./middlewares/errorHandler.js";
import not_found_handler from "./middlewares/notFoundHandlers.js";
import {engine} from "express-handlebars";
import __dirname from "../utils.js";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

let server = express();

//template engine
server.engine("handlebars", engine());      //Inicializamos el motor de plantilla
server.set("view engine", "handlebars");    //Configurar el motor para que funcione
server.set("views", __dirname + "/src/views"); //Configurar donde irán las plantillas

//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE));
server.use(expressSession({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}));
server.use('/public', express.static("public"));
server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.use("/", router);
server.use(errorHandler);
server.use(not_found_handler);

//database
connect("mongodb+srv://admin:Karina137@cluster0.lpiuuos.mongodb.net/coder")
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

export default server;