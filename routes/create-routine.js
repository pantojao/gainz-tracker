const express = require("express");
const router = express.Router();

const {Exercise} = require("../models/userModel");
const {Routine} = require("../models/userModel");

router.post("/", async (req, res) => { 
    const data = req.body
    let exercises;
  for (let exercise of data){
      let newExercise = new Exercise({
          exerciseName: exercise.exerciseName,
          sets: exercise.sets,
          repititions: exercise.reps,
          weight: 0
      })
      
      try {
        await newExercise.save()
      } catch (error) {
          console.error(error)
      }
  }
  
  let exercisesArray = []
  let RoutineName = data[0].routineName

  data.forEach((x) => exercisesArray.push({
      exerciseName: x.exerciseName,
      sets: x.sets, 
      reps: x.reps,
    }))

  console.log(exercisesArray)

  let newRoutine = new Routine({
    routineName: RoutineName,
    exercises: exercisesArray
  })



  try {
    const res = await newRoutine.save()
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
