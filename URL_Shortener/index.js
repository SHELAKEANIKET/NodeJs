const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");

//! all routes
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 3001;

//? connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB Connected");
});

// set the view engine to ejs
app.set("view engine", "ejs");

// access the ejs file
app.set("views", path.resolve("./views"));

//! middlewares
app.use(express.json()); //! support json data
app.use(express.urlencoded({ extended: false })); //! support form data
app.use(cookieParser()); //! cookie-parser

//! routes
app.use("/url", restrictToLoggedInUserOnly, urlRoute); //! if user logged in then only he can generate the short url
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

//! visited to that short-url
app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).send("URL not found");
    }

    return res.redirect(entry.redirectURL);

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
