const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.get("/send", (req, res) => {
    res.render("send.ejs");
});

router.get("/receive", (req, res) => {
    res.render("receive.ejs");
});

module.exports = router;
