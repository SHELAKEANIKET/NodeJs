const express = require("express");
const router = express.Router();
const URL = require("../models/url");

//? show all the url presents in the db on the home page (index)
router.get("/", async (req, res) => {
  if(!req.user) return res.redirect("/login")
  const allUrls = await URL.find({ generatedBy:req.user._id });
  return res.render("index", {
    urls: allUrls,
  });
});

//? render signup page
router.get("/signup", (req, res) => {
  return res.render("signup");
});

//? render login page
router.get("/login", (req, res) => {
  return res.render("login");
});
module.exports = router;
