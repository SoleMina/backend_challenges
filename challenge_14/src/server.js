import server from "./app.js";
import { Server } from "socket.io";
import { logger } from "./config/logger.js";
import config from "./config/configuration.js";
import cluster from "node:cluster";
import {cpus} from "node:os";

const PORT = config.port || 8000;

const http_server = server.listen(PORT, err => {
    // console.log(`Listening server on ${PORT}`);
    if (err) logger.error(err);
    logger.info(`Listening server on ${PORT}`);
});

const io = new Server(http_server);

let messages = [];
let contador = 0;

io.on("connection", socket => {
    // console.log(socket.client.id);
    socket.emit("messageslog", messages);
    socket.on("message", data => {
        console.log(data);
        messages.push(data);
        io.emit("messageslog", messages);
    })
});

console.log(cluster.isPrimary, "cluster");
if(cluster.isPrimary) {
    logger.info("Proceso primario, generando worker");
    cluster.fork();
}else{
    console.log("Al ser proceso forkeado, no cuenta como primario, por lo que soy un worker");
}

const numProcess = cpus().length;
console.log(numProcess, 'num');