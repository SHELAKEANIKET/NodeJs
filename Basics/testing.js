const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./RestAPI/controllers/routes/user");
const fs = require("fs");
// const users = require("./MOCK_DATA.json"); // import the local json data

const app = express(); // handler function
const PORT = 3000;

//! connection code start ---->
// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/my-first-app")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Error", error));
//! connection code end ---->

// Schemas
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
const User = mongoose.model("user", userSchema); // 'user' is a collection name

// Routes
app.get("/", async (req, res) => {
  const allDBUsers = await User.find({});

  const html = `
    <ul>
    ${allDBUsers
      .map(
        (user) =>
          `<li>
        ${user.firstName} ${user.lastName} ${user.email}
      </li>`
      )
      .join("")}
    </ul>
       `;
  return res.send(html);
});

//! REST API
// 2. show all users json format
app.get("/", (req, res) => {
  return res.json(users);
});

// 3. get the single user data dynamically
app.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User Not Found ..." });
  }
  return res.json(user);
});

// 4. post request (new user creating)
app.post("/", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "Success" });
});

app.patch("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ status: "Success.." });
});

app.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success.." });
});

//? Middleware
app.use(express.urlencoded({ extended: false }));

//? custom middlewares
app.use((req, res, next) => {
  console.log("middleware 1");
  next(); // calls to the next middleware/functions
});

app.use((req, res, next) => {
  console.log("middleware 2");
  next(); // calls to the next middleware/fuctions
});

//Routes
app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));

// another method - grouping the routes
/*
app.route('/api/users/:id')
.get((req,res)=>{
    const id = Number(req.params.id); // convert string value into number
    const user = users.find((user)=>user.id === id);
     if (!user) {
    return res.status(404).json({ error: "User Not Found ..." });
  }
    return res.json(user);
})
.patch((req,res)=>{
    // pending work
})
.delete((req,res)=>{
    // pending work
})

app.post('/api/users',(req,res)=>{
    const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
})
*/
