import server from "./app.js";
import { Server } from "socket.io";
import { logger } from "./config/logger.js";
import config from "./config/configuration.js";

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