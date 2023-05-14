const express = require("express");
const server = express();
const PORT = process.env.PORT || 8000;

const productsRouter = require("./routers/products");
const cartsRouter = require("./routers/carts");

server.listen(PORT, () => {
    console.log(`Listening server on ${PORT}`)
});

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static("public"));
server.use("/api/products", productsRouter);
server.use("/api/carts", cartsRouter);
