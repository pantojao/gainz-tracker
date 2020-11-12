const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const { User } = require("../models/userModel");


router.post('/', async (req,res) =>{
  const currentUser = await User.findOne({_id: req.user._id})
  currentUser.routines = req.body
  await currentUser.save()
  res.send('Routine has been deleted')
}) 

module.exports = router