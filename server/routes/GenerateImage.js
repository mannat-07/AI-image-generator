const express = require("express");
const { generateImage } = require("../controllers/GenerateImage");

const router = express.Router();

router.post("/", generateImage);

module.exports = router;
