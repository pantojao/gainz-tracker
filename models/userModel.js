const mongoose = require("mongoose");

const exercise = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  sets: Number,
  reps: Number,
  weight: [Number],
});

const routine = new mongoose.Schema({
  routineName: { type: String, required: true },
  exercises: [exercise],
})

const sessionExercise = new mongoose.Schema({
  exerciseName: String,
  reps: Number, 
  sets: Number, 
  average: Number,
  max: Number,
  maxLift: Number,
  hasMax: Boolean,
  weights: [Number]
})

const session = new mongoose.Schema({
  routineName: String,
  exercises: [sessionExercise],
  totalWeight: Number,
  length: String,
  startTime: String,
  endTime: String
});

const user = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  sessions: [session],
  routines: [routine]
});

const Exercise = mongoose.model("Exercise", exercise);
const Session = mongoose.model("Session", session);
const Routine = mongoose.model("Routine", routine);
const User = mongoose.model("User", user);

module.exports = {User , Exercise, Session, Routine}
