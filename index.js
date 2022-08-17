const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.send("Estas solicitando la ruta raíz");
});



app.listen(5000, () => console.log("Servidor andando 🚀"));