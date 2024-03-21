const shortid = require("shortid");
const URL = require("../models/url");

async function generateRandomURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }
  const shortID = shortid(); //? it generate random id with 8 characters

  //? new url create
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitedHistory: [],
    generatedBy : req.user._id,
  });

  //? index page render here
  return res.render("index", {
    id: shortID,
  });
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

module.exports = {
  generateRandomURL,
  getAnalytics,
};
