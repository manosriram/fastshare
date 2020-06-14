const server = require("./io-server.js").server;
const io = require("./io-server.js").io;
const app = require("./io-server.js").app;
const port = process.env.PORT || 5000;
const express = require("express");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/share", require("./share.js"));
require("./handle-connections.js");

app.use((error, req, res, next) => {
    res.status(403);
    res.json({ error: error.message });
});

server.listen(port, () => console.log(`Server at ${port}`));
