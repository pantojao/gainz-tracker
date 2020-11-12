const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");


router.get('/', async (req,res) =>{
  if (req.isAuthenticated()){
    const user = await User.findOne({username: req.user.username})
    const userRoutines = user.routines
    res.send(userRoutines)
  } else {
    res.send('login')
  }

  
})

module.exports = router
