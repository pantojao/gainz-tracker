const express = require("express");
const router = express.Router();

const {Exercise} = require("../models/userModel");
const {Routine} = require("../models/userModel");

router.get('/', async (req,res) =>{
  let routines = await Routine.find({})
  res.json({routines})
})

module.exports = router
