const io = require("./io-server.js").io;
const { nanoid } = require("nanoid");
let connections = [{}];

io.on("connection", socket => {
    const roomid = nanoid(8);
    socket.emit("code", roomid);

    socket.on("join-rec", room => {
        if (connections[room]) {
            socket.join(room);
            socket.emit("joined", room);
        } else {
            socket.emit("joined", "Connection not available");
        }
    });

    socket.on("join", room => {
        connections[room] = true;
        socket.join(room);
        socket.emit("joined", room);
    });

    socket.on("handle-files", ({ fileList, cod, fileNameList }) => {
        let data = [];
        for (let t = 0; t < fileNameList.length; ++t)
            data.push({ name: fileNameList[t], buffer: fileList[t] });

        socket.to(cod).emit("receive", data);
    });

    socket.on("disconnect", () => {});
});
