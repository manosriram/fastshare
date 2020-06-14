const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server).listen(server);

module.exports = {
    server,
    io,
    app
};
