const express = require("express");
const router = express.Router();
const { User} = require("../models/userModel");

router.get("/", (req, res) => { 
  req.logOut()
  res.send(true)
});

module.exports = router;
