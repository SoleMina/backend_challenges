import server from "./app.js";
import { Server } from "socket.io";

const PORT = process.env.PORT || 8000;

const http_server = server.listen(PORT, () => {
    console.log(`Listening server on ${PORT}`)
});

const io = new Server(http_server);

let messages = [];

io.on("connection", socket => {
    // console.log(socket.client.id);
    socket.emit("messageslog", messages);
    socket.on("message", data => {
        console.log(data);
        messages.push(data);
        io.emit("messageslog", messages);
    })
});