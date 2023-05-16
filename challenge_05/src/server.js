import server from "./app.js";
import { Server } from "socket.io";

const PORT = process.env.PORT || 8000;

const http_server = server.listen(PORT, () => {
    console.log(`Listening server on ${PORT}`)
});

const io = new Server(http_server);

io.on("connection", socket => {
    console.log(socket.client.id);
    socket.on("message", data => {
        console.log(data);
    })
});