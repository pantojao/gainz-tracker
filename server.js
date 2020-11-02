require('dotenv').config()
const ejs = require('ejs')
const mongoose = require('mongoose')
const express = require('express')
const app = express();

const loginRoute = require('./routes/login')
const homePageRoute = require('./routes/homepage')
const registerRoute = require('./routes/register')
const newSessionRoute = require('./routes/new-session')
const sessionsRoute = require('./routes/sessions')

const User = require('./models/userModel.js') 

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connect', () =>{
    console.log("connected to database")
})

app.use('/', loginRoute)
app.use('/homepage', homePageRoute)
app.use('/register', registerRoute)
app.use('/new-session', newSessionRoute)
app.use('/sessions', sessionsRoute)

app.listen(3000, () => {
    console.log('listening on port 3000')
})