const express = require("express");
const {Server} = require("socket.io");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log("Listening server on: " + PORT);
});

const io = new Server(server);
app.use(express.static(__dirname + "/public"));
let messages = [];

io.on("connection", socket => {
    console.log("socket conectado");
    socket.emit("messagelog", messages); //cuando el cliente se conecta igual verá los mensajes pasados
    socket.emit("welcome", "Bienvenido a mi socket bien exitoso");
    socket.on("message", data => {
        messages.push(data);
        io.emit("messagelog", messages);
    })
})