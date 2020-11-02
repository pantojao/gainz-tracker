const { response } = require('express');
const express = require('express');
const router = express.Router();
const User = require("../models/userModel");

router.get('/', async (req,res) => {
  let responseData = await User.find({})
  res.json(responseData)
})

module.exports = router