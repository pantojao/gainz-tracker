const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");


router.post('/', async (req,res) =>{
  const routineId = req.body.routine
 
  const user = await User.findOne({_id: req.user._id})

  let userRoutine;
  for (let routine of user.routines){
     if(routine._id == routineId){
       userRoutine = routine
       break
     }
  }
  res.send(userRoutine)
})

module.exports = router