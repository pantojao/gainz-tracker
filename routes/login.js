const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {User} = require("../models/userModel");
const passport = require("passport")

router.post("/",  (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Incorrect Password or Username");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
});

module.exports = router;
