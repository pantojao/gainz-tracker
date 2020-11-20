const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const { User } = require("../models/userModel");
const moment = require("moment");

function getTimeDiff(start, end) {
  return moment.duration(
    moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a"))
  );
}

router.post("/", async (req, res) => {
  let userSession = req.body;
  userSession.endTime = new Date().toLocaleString();
  let endTime = userSession.endTime.split(" ").slice(1).join(" ");
  let startTime = userSession.startTime.split(" ").slice(1).join(" ");
  let diff = getTimeDiff(startTime, endTime);
  let routinelength = `${diff.hours()} Hour ${diff.minutes()} minutes`;
  let totalWeight = 0;

  for (let exercise of userSession.exercises) {
    for (let weight of exercise.weights.newWeights) {
      totalWeight += weight;
    }
  }

  for (let exercise of userSession.exercises) {
    exercise.allWeights = exercise.weights.userWeights.concat(
      exercise.weights.newWeights
    );
    if (exercise.allWeights[0] == 0)
      exercise.allWeights = exercise.allWeights.slice(1);
  }

  for (let exercise of userSession.exercises) {
    let max = 0;
    for (let weight of exercise.weights.newWeights) {
      if (weight > max) max = weight;
    }
    exercise.maxLift = max;
  }

  for (let exercise of userSession.exercises) {
    exercise.hasMax = false;
    for (let weight of exercise.weights.newWeights) {
      if (weight > exercise.exerciseMax) exercise.hasMax = true;
    }
  }


  // // SAVE TO SESSION

  let session = { exercises: [] };
  for (exercise of userSession.exercises) {
    let sessionExercise = {};
    sessionExercise.exerciseName = exercise.exerciseName;
    sessionExercise.reps = exercise.reps;
    sessionExercise.sets = exercise.sets;
    sessionExercise.average = exercise.exerciseAverage;
    sessionExercise.weights = exercise.weights.newWeights;
    sessionExercise.max = exercise.exerciseMax;
    sessionExercise.hasMax = exercise.hasMax;
    sessionExercise.maxLift = exercise.maxLift;
    session.exercises.push(sessionExercise);
  }
  session.routineName = userSession.routineName;
  session.startTime = userSession.startTime;
  session.endTime = userSession.endTime;
  session.length = routinelength;
  session.totalWeight = totalWeight;

  let currentUser;
  try {
    currentUser = await User.findById({ _id: req.user._id });
    currentUser.sessions.push(session);
  } catch (error) {
    console.log(error);
  }

  const saveWeight = (oldRoutine, newRoutine) => {
    oldRoutine.exercises.map((exercise, index) => {
      exercise.weight = newRoutine.exercises[index].allWeights;
      return exercise;
    });
  };

  for (let routine of currentUser.routines) {
    if (routine.routineName == session.routineName) {
      saveWeight(routine, userSession);
    }
  }

  try {
    let mongoResponse = await currentUser.save();
    console.log(mongoResponse);
    res.send("Session Completed");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
