const User = require("../models/user");

//! get all users
async function getAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

//! get single user by id
async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User Not Found ..." });
  }
  return res.json(user);
}

//! update user by id
async function updateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ status: "Updated User Successfully..." });
}

//! delete user by id
async function deleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Deleted User Successfully..." });
}

//! create new user
async function createNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Created User Successfully...", id: result._id });
}

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};
