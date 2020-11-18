const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const { User } = require("../models/userModel");
const moment = require("moment")

function getTimeDiff(start, end) {
  return moment.duration(moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a")));
}

router.post('/', async (req,res) =>{
  let userSession = req.body
  userSession.endTime = new Date().toLocaleString()

  let endTime = userSession.endTime.split(" ").slice(1).join(" ")
  let startTime = userSession.startTime.split(" ").slice(1).join(" ")
  let diff = getTimeDiff(startTime,endTime)
  let routinelength = `${diff.hours()} Hour ${diff.minutes()} minutes`
  let totalWeight = 0 

  for (let exercise of userSession.exercises){
    for (let weight of exercise.weights.newWeights){
      totalWeight +=weight
    }
  }

  for (let exercise of userSession.exercises){
    exercise.allWeights = exercise.weights.userWeights.concat(exercise.weights.newWeights)
    if (exercise.allWeights[0]==0) exercise.allWeights = exercise.allWeights.slice(1)
  }
  

  // SAVE TO SESSION
  
  let session = {exercises: []}
  for(exercise of userSession.exercises){
    let sessionExercise = {}
    sessionExercise.exerciseName = exercise.exerciseName 
    sessionExercise.reps = exercise.reps
    sessionExercise.sets = exercise.sets
    sessionExercise.average = exercise.exerciseAverage
    sessionExercise.weights = exercise.weights.newWeights
    session.exercises.push(sessionExercise)
  }
  session.routineName = userSession.routineName
  session.startTime = userSession.startTime
  session.endTime = userSession.endTime
  session.length = routinelength
  session.totalWeight = totalWeight

  console.log(session)
  // SAVE WEIGHT TO ROUTINES WEIGHT
  
})

module.exports = router