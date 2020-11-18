const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");


router.post('/', async (req,res) =>{
  let userSession = req.body
  console.log(req.body)
  for (let exercise of userSession){
    exercise.allWeights = exercise.weights.userWeights.concat(exercise.weights.newWeights)
  }
  console.log(userSession)
  
})

module.exports = router