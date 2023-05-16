import express from "express";
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import router from "./routers/index.js";

const server = express();

//middlewares
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use("/public", express.static("public"));

//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");

//Endpoints
server.use("/", router);

export default server;
