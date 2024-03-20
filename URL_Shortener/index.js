const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter')
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");

const app = express();
const PORT = 3001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB Connected");
});

// set the view engine to ejs
app.set("view engine", "ejs");

// access the ejs file
app.set("views", path.resolve("./views"));

// middleware
app.use(express.json()); //! support json data
app.use(express.urlencoded({extended:false})) //! support form data

app.use("/url", urlRoute);
app.use('/',staticRoute)


//! all the users
app.get("/test", async (req, res) => {
  const allUsers = await URL.find({});

  return res.render("index",{
    urls : allUsers
  }); //? render the index.ejs file from './views' folder
});

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
