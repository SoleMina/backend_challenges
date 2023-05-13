const express = require("express");
const {Server} = require("socket.io");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log("Listening server on: " + PORT);
});

const io = new Server(server);
app.use(express.static("public"));