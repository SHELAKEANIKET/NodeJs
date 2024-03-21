const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login"); //! if user not logged in

  const user = getUser(userUid);

  if (!user) return res.redirect("/login"); //! if user not found

  //? all fine
  req.user = user; //? store user in the req object
  next(); //? call next middleware
}

async function checkAuth (req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user; //? store user in the req object
  next(); //? call next middleware
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth
};
