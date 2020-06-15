const io = require("./io-server.js").io;
const { nanoid } = require("nanoid");

io.on("connection", socket => {
    const roomid = nanoid(8);
    socket.emit("code", roomid);

    socket.on("join", room => {
        socket.join(room);
        socket.emit("joined", room);
    });

    socket.on("handle-files", ({ fileList, cod, fileNameList }) => {
        let data = [];
        for (let t = 0; t < fileNameList.length; ++t)
            data.push({ name: fileNameList[t], buffer: fileList[t] });

        socket.to(cod).emit("receive", data);
    });
});
