const express = require("express");
const { create } = require("express-handlebars");

const app = express();

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
    const urls = [
        { origin: "www.google.com/EnriqueGmz1", shortURL: "fdaasdasd1" },
        { origin: "www.google.com/EnriqueGmz2", shortURL: "fdaasdasd2" },
        { origin: "www.google.com/EnriqueGmz3", shortURL: "fdaasdasd3" },
        { origin: "www.google.com/EnriqueGmz4", shortURL: "fdaasdasd4" },
    ];
    res.render("home", { urls: urls });
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Middlewares
app.use(express.static(__dirname + "/public"))

app.listen(5000, () => console.log("Servidor andando 🚀"));