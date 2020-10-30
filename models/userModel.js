const mongoose = require('mongoose')

let user = new mongoose.Schema({
    userName: {type: String, required: true},
    password: { type: String, required: true}
})

let User = mongoose.model("User", user)

module.exports = User