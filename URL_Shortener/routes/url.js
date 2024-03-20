const express = require("express");
const router = express.Router();
const { generateRandomURL, getAnalytics } = require("../controllers/url");

router.post("/", generateRandomURL);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
