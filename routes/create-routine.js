const express = require("express");
const { set } = require("mongoose");
const router = express.Router();

const {Exercise, User} = require("../models/userModel");
const {Routine} = require("../models/userModel");

router.post("/", async (req, res) => { 
  const data = req.body
  let currentUser = await User.findOne({username: req.user.username})
  let exercisesArray = []
  data.forEach(exercise => {
    exercise.exerciseName = exercise.exerciseName.replace(/\s+/g,' ').trim().toLowerCase().split(" ")
    exercise.exerciseName = exercise.exerciseName.map(word => word.charAt(0).toUpperCase()+ word.slice(1)).join(" ")
  })

  data.forEach((exercise) => exercisesArray.push({
      exerciseName:  exercise.exerciseName,
      sets: exercise.sets, 
      reps: exercise.reps,
      weight: 0
    }))

  let routineName = data[0].routineName.replace(/\s+/g,' ').trim().toLowerCase().split(" ")
  routineName = routineName.map(word => word.charAt(0).toUpperCase()+ word.slice(1)).join(" ")

  let newRoutine = {routineName: routineName, exercises: exercisesArray}
  currentUser.routines.push(newRoutine)

  try {
    const mongoResponse = await currentUser.save()
    console.log(mongoResponse)
    res.send("Routine Created")
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
