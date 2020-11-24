const express = require("express");
const router = express.Router();
const { User} = require("../models/userModel");

router.get("/", (req, res) => { 
  if (req.isAuthenticated()){
    res.send("true")
  } else {
    res.send("false")
  }
  
});

module.exports = router;
