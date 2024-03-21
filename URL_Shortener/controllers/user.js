const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

//! signup function
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  //? create new user
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/"); //? home page
}

//! login function
async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  //? find user
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("login", {
      error: "Invalid Email or Password",
    });
  }

  const sessionId = uuidv4(); //? it generate uid
  setUser(sessionId, user);
  res.cookie("uid", sessionId); //? cookie generated after login with name 'uid'

  return res.redirect("/"); //? home page
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
