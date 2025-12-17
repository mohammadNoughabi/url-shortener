const express = require("express");

const urlController = require("../controllers/url.controller");

const router = express.Router();

router.post("/shorten", urlController.shortenUrl);
router.get("/:shortId", urlController.getshortUrl);

module.exports = router;
