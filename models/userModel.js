const mongoose = require("mongoose");

const exercise = new mongoose.Schema({
  ExerciseName: { type: String, required: true },
  repititions: [Number],
  weight: [Number],
});

const session = new mongoose.Schema({
  routineName: { type: String, required: true },
  exercises: [exercise],
  date: { type: Date, default: Date.now },
});

const user = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  sessions: [session],
});

const User = mongoose.model("User", user);

module.exports = User;
