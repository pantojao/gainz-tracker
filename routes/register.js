const express = require("express");
const router = express.Router();
const {User} = require("../models/userModel");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const data = await User.findOne({ username: req.body.username });
    if (data!==null) {
      res.send("Username Taken")

    } else {
      const hash = await bcrypt.hash(req.body.password, 12);
      const user = new User({
        username: req.body.username,
        password: hash,
      });

      await user.save();
      res.send("User Created")
    }
  } catch (error) {
    console.log(error)
  }

});

module.exports = router;
