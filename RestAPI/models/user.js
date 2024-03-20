const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Model
const User = mongoose.model("user", userSchema); //? here 'user' is a collection name & 'userSchema' is a document.

module.exports = User;



//! Note: in mongoose.model() collection name should be singular & it will be automatically changed to plural in the database.
