const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");


router.post('/', async (req,res) =>{
  const routineId = req.body.routine
  const routine = await User.getOne
  console.log(routineId)
})

module.exports = router