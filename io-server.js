const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const morgan = require("morgan");
const server = http.createServer(app);
const io = socketio(server).listen(server);

app.use(morgan("tiny"));
app.use(express.json());

module.exports = {
    server,
    io,
    app
};
