const express = require("express");
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const {User} = require("../models/userModel");
const mongoose = require('mongoose');

router.post("/", async (req, res) => { 
  const data = req.body
  let routineName = data.routineName
  const routineKey = data.routineKey
  let newExercises = data.exercises

  routineName = routineName.replace(/\s+/g,' ').trim().toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase()+ word.slice(1)).join(" ")

  let currentUser = await User.findById(req.user._id)
  let routines = currentUser.routines
  
  for (let exercise of newExercises){
    exercise.exerciseName = exercise.exerciseName.replace(/\s+/g,' ').trim().toLowerCase().split(" ")
    exercise.exerciseName = exercise.exerciseName.map(word => word.charAt(0).toUpperCase()+ word.slice(1)).join(" ")
    if(ObjectId.isValid(exercise._id.toString())==false){
      exercise._id = new mongoose.Types.ObjectId();
      console.log(exercise._id)
    }
  }

  for (let routine of routines){
    if(routine._id == routineKey){
      routine.exercises = newExercises
      routine.routineName = routineName
    }
  } 

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
