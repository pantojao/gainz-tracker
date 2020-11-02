const bodyParser = require("body-parser");
const express = require("express");
const { findOne } = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  try {
    let data = await User.findOne({ userName: req.body.userName });
    if (data === null) {
      res.render("login", { message: "account does not exist" });
    } else {
      if (bcrypt.compareSync(req.body.password, data.password)) {
        res.redirect("/homepage");
      } else {
        res.render("login", { message: "password is incorrect" });
      }
    }
  } catch (error) {
    res.render("login");
  }
});

module.exports = router;
