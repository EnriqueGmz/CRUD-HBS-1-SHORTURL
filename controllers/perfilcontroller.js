const formidable = require("formidable");
const Jimp = require("jimp");
const fs = require("fs");
const path = require("path")
const User = require("../models/User");

const formPerfil = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        return res.render("perfil", { user: req.user, imagen: user.imagen });
    } catch (error) {
        req.flash("mensajes", [{ msg: "Error al leer el usuario" }]);
        return res.redirect("/perfil");
    }
}

const editarFotoPerfil = async (req, res) => {
    const form = new formidable.IncomingForm;
    form.maxFileSize = 50 * 1024 * 1025//5mb

    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                throw new Error("Falló fla subida de imagen");
            }

            // console.log(files.myFile);
            const file = files.myFile;

            if (file.originalFilename === "") {
                throw new Error("Por favor agrega una imagen");
            };

            const imageTypes = [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/gif",
            ];

            // if (!(file.mimetype === "image/jpg" || file.minetype === "image/png")) {
            //     throw new Error("Por favor agrega una imagen .jpg o .png");
            // }

            if (!imageTypes.includes(file.mimetype)) {
                throw new Error("Por favor agrega una imagen .jpg o png");
            }

            if (file.size > 50 * 1024 * 1025) {
                throw new Error("Menos de 5mb por favor");
            };

            const extension = file.mimetype.split("/")[1];
            const dirFile = path.join(__dirname, `../public/img/perfiles/${req.user.id}.${extension}`);
            console.log(dirFile);

            fs.renameSync(file.filepath, dirFile);

            const image = await Jimp.read(dirFile);
            image.resize(200, 200).quality(90).writeAsync(dirFile);

            const user = await User.findById(req.user.id);
            user.imagen = `${req.user.id}.${extension}`;
            await user.save();

            req.flash("mensajes", [{ msg: "Ya se subió la imagen" }]);

        } catch (error) {
            req.flash("mensajes", [{ msg: error.message }]);
        } finally {
            return res.redirect("/perfil")
        }
    })
};

module.exports = {
    formPerfil,
    editarFotoPerfil,
}