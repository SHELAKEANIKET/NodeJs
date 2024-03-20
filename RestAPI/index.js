const express = require("express");
const userRoutes = require("./routes/user");
const { connectMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares");

const app = express(); // handler function
const PORT = 3000;

//! connection
connectMongoDB("mongodb://127.0.0.1:27017/my-first-app").then(()=>{
    console.log('MongoDB Connected')
})

//! Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//! Routes
app.use("/api/users", userRoutes); // http://localhost:3000/api/user

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
