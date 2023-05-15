import server from "./app.js";
import {Server} from "socket.io";

const PORT = process.env.PORT || 8080;
const ready = () => console.log(`Server ready on ${PORT}`);

const chats = [];

const http_server = server.listen(PORT, ready);
const socket_server = new Server(http_server);
socket_server.on("connection", socket => {
    console.log(socket.client.id);
    socket.on("auth", () => {
        socket_server.emit("allMessages", chats);
    });
    socket.on("new_message", data => {
        chats.push(data);
        console.log(chats);
        socket_server.emit("allMessages", chats);
    })
})