const express = require("express");
const { leerUrls, agregarUrl, eliminarUrl } = require("../controllers/homecontroller");
const router = express.Router();

router.get("/", leerUrls);
router.post("/", agregarUrl);
router.get("/eliminar/:id", eliminarUrl);

module.exports = router;