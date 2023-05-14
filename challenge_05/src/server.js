import express from "express";
import productsRouter from "./routers/products.js";
import cartsRouter from "./routers/carts.js";
import {engine} from "express-handlebars";

const server = express();
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Listening server on ${PORT}`)
});

//middlewares
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static("public"));

//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");

//Endpoints
server.use("/api/products", productsRouter);
server.use("/api/carts", cartsRouter);
