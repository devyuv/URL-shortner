const express = require("express");
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
// routes for getting clicks
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router; //POST router is done