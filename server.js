require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const app = express();
const mongoose = require('mongoose')

const loginRoute = require('./routes/login')
const homePageRoute = require('./routes/homepage')
const registerRoute = require('./routes/register')

const User = require('./models/userModel.js') 

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static(__dirname + '/public'));

mongoose.connection.on('connect', () =>{
    console.log("connected to database")
})

app.use('/', loginRoute)
app.use('/homepage', homePageRoute)
app.use('/register', registerRoute)


app.listen(3000, () => {
    console.log('listening on port 3000')
})