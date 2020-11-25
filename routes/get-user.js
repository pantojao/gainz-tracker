const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");


router.get('/', async (req,res) =>{
    const user = await User.findOne({username: req.user.username})
    user.password = null
    res.send(user)
})

module.exports = router