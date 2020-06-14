const io = require("./io-server.js").io;
const { nanoid } = require("nanoid");

io.on("connection", socket => {
    const room = nanoid(8);
    socket.join(room);

    socket.emit("code", room);

    socket.on("handle-files", fileList => {
        console.log(fileList);
    });
});
