const http = require("http");
const express = require("express");
const app = express();
const socketio = require("socket.io");
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server).listen(server);

module.exports = {
    server,
    io,
    app
};
