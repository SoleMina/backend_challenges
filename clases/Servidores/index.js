import express from "express";
import manager from "./users.js";

let server = express();

let PORT = 8080;

let ready = () => console.log("Server ready on port " + PORT);

server.listen(PORT, ready);

server.use(express.urlencoded({extended:true}));

let index_route = "/";
let index_function = (req, res) => {
    let quantity = manager.read_user().length;
    return res.send(`There are ${quantity} users`);
}

server.get(index_route, index_function);
