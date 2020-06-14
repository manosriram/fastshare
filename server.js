const express = require("express");
const port = process.env.PORT || 5000;
const path = require("path");
const app = express();
const server = require("./io-server.js").server;
const io = require("./io-server.js").io;

app.get("/", (req, res) => {
    res.redirect("/share");
});

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/share", require("./share.js"));

app.use((error, req, res, next) => {
    res.status(403);
    res.json({ error: error.message });
});

server.listen(port, () => console.log(`Server at ${port}`));
