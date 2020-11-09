const mongoose = require("mongoose");

const exercise = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  sets: Number,
  repititions: Number,
  weight: [Number],
});

const routine = new mongoose.Schema({
  routineName: { type: String, required: true },
  exercises: [exercise],
})

const session = new mongoose.Schema({
  routine: routine,
  date: { type: Date, default: Date.now },
});

const user = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  sessions: [session],
  routines: [routine]
});

const Exercise = mongoose.model("Exercise", exercise);
const Session = mongoose.model("Session", session);
const Routine = mongoose.model("Routine", routine);
const User = mongoose.model("User", user);

module.exports = {User , Exercise, Session, Routine}
