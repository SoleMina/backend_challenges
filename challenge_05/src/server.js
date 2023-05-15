import express from "express";
import productsRouter from "./routers/products.js";
import cartsRouter from "./routers/carts.js";
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import router from "./routers/index.js";

const server = express();
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Listening server on ${PORT}`)
});

//middlewares
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use("public", express.static(__dirname + "/public"));
server.use("/", router);

//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");

//Endpoints
server.use("/api/products", productsRouter);
server.use("/api/carts", cartsRouter);
