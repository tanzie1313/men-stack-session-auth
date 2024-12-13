const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');


// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";
//require controllers
const authController = require("./controllers/auth.js");


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
// Middleware for using session
app.use(methodOverride("_method"));
app.use(morgan('dev'));
// new
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


// routes

// GET /
app.get("/", (req, res) => {
    res.render("index.ejs", {
      user: req.session.user,
    });
  });
  

app.use("/auth", authController);
  

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
