const Url = require("../models/Url");
const { v4: uuidv4 } = require("uuid");

const leerUrls = async (req, res) => {
    const urls = [
        { origin: "www.google.com/EnriqueGmz1", shortURL: "fdaasdasd1" },
        { origin: "www.google.com/EnriqueGmz2", shortURL: "fdaasdasd2" },
        { origin: "www.google.com/EnriqueGmz3", shortURL: "fdaasdasd3" },
        { origin: "www.google.com/EnriqueGmz4", shortURL: "fdaasdasd4" },
    ];
    res.render("home", { urls: urls });
};

const agregarUrl = async (req, res) => {
    const { origin } = req.body;

    try {
        const url = new Url({ origin: origin, shortURL: uuidv4(3) });
        await url.save()
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.send("error algo falló")
    }
};

module.exports = {
    leerUrls,
    agregarUrl
}