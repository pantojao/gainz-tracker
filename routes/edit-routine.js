const express = require("express");
const router = express.Router();
const {User} = require("../models/userModel");


router.post("/", async (req, res) => { 
  const data = req.body
  const routineName = data.routineName
  const routineKey = data.routineKey
  const newExercises = data.exercises
  console.log(newExercises)
  let currentUser = await User.findById(req.user._id)
  let routines = currentUser.routines


  for (let routine of routines){
    if(routine._id == routineKey){
      routine.exercises = newExercises
      routine.routineName = routineName
    }
  }
  
  console.log(routines)

  try {
    let mongoResponse = await currentUser.save()
    console.log(mongoResponse)
    res.send("routine updataed")
  } catch (error) {
    console.log(error)
    res.send("error on our end")
  }
  
});

module.exports = router;
