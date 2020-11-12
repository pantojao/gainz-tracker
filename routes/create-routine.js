const express = require("express");
const router = express.Router();

const {Exercise, User} = require("../models/userModel");
const {Routine} = require("../models/userModel");

router.post("/", async (req, res) => { 
  const data = req.body
  let currentUser = await User.findOne({username: req.user.username})
  let exercisesArray = []

  data.forEach((x) => exercisesArray.push({
      exerciseName: x.exerciseName,
      sets: x.sets, 
      reps: x.reps,
      weight: 0
    }))
  
  let newRoutine = {routineName: data[0].routineName, exercises: exercisesArray}
  currentUser.routines.push(newRoutine)

  try {
    await currentUser.save()
    res.send("Routine Created")
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
