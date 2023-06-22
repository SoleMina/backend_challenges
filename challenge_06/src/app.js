import express from "express";
import "dotenv/config.js";
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import router from "./routers/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandlers from "./middlewares/notFoundHandlers.js";
import { connect } from "mongoose";

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
server.use(errorHandler);
server.use(notFoundHandlers);

//database
connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

export default server;
