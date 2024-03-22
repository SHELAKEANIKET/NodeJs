const jwt = require("jsonwebtoken");
const secret = "aniket@123@$"; // this is secret key

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  ); // this is like a stamp
}

function getUser(token) {
  if (!token) return null; // token not found
   
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null; // invalid token
  }
}

module.exports = {
  setUser,
  getUser,
};
