const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");


router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
  });
  router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });
  router.post("/sign-in", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
if (!userInDatabase) {
  return res.send("Login failed. Please try again.");
}
const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );
  if (!validPassword) {
    return res.send("Login failed. Please try again.");
    req.session.user = {
        username: userInDatabase.username,

      };
      
  }
  
    res.redirect("/");
  });
  
  
  
    router.post("/sign-up", async (req, res) => {
        const userInDatabase = await User.findOne({ username: req.body.username });
if (userInDatabase) {
  return res.send("Username already taken.");
}
if (req.body.password !== req.body.confirmPassword) {
    return res.send("Passwords do not match.");
}
const hashedPassword = bcrypt.hashSync(req.body.password, 10);
req.body.password = hashedPassword;
// validation logic

const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}`);


    }
    );
  

module.exports = router;

