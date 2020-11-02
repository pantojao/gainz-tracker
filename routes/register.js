const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  let user = new User({
    userName: req.body.userName,
    password: req.body.password,
  });

  try {
    let data = await User.findOne({ userName: req.body.userName });

    if (data !== null) {
      res.render("register", { message: "username is taken" });
    } else {
      let hash = await bcrypt.hash(req.body.password, 12);
      let user = new User({
        userName: req.body.userName,
        password: hash,
      });
      await user.save();
      res.redirect("homepage");
    }
  } catch (error) {
    res.render("register");
  }
});

module.exports = router;
