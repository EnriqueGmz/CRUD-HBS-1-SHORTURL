const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const urls = [
        { origin: "www.google.com/EnriqueGmz1", shortURL: "fdaasdasd1" },
        { origin: "www.google.com/EnriqueGmz2", shortURL: "fdaasdasd2" },
        { origin: "www.google.com/EnriqueGmz3", shortURL: "fdaasdasd3" },
        { origin: "www.google.com/EnriqueGmz4", shortURL: "fdaasdasd4" },
    ];
    res.render("home", { urls: urls });
});

module.exports = router;