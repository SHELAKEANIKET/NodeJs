const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/test";

// while connecting to the atlas then use it's driver link with username, passward and db name

// connection
mongoose.connect(url);

// schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

// model
const User = new mongoose.model("user", userSchema);

const user11 = {
  username: "user11",
  email: "user11@example.com",
  age: 24,
};

// CRUD operation
const main = async () => {
  try {
    //! read operation
    // const data = await User.find();
    // console.log(data);

    //! insert operation
    await User.insertMany(user11);
    const data = await User.find();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
};

main();
