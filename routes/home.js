const express = require("express");
const { leerUrls } = require("../controllers/homecontroller");
const router = express.Router();

router.get("/", leerUrls);

module.exports = router;