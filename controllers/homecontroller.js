const Url = require("../models/Url");
const { v4: uuidv4 } = require("uuid");

const leerUrls = async (req, res) => {

    try {
        const urls = await Url.find().lean();
        res.render("home", { urls: urls });
    } catch (error) {
        console.log(error);
        res.send("falló algo...")
    }
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