const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");
 
router.post('/', async (req,res) =>{
  let mongoResponse = await User.findById(req.user._id)
  let session = mongoResponse.sessions
  res.send(session)
})

module.exports = router