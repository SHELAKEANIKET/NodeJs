const express = require("express");
const router = express.Router();
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");

router.post("/", handleUserSignUp); //? after signup send to home page

router.post("/login", handleUserLogin);

module.exports = router;
