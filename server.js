require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const {User} = require("./models/userModel");
const bcrypt = require("bcrypt")
var MongoStore  = require('connect-mongo')(session);

const app = express();

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const getRoutinesRoute = require('./routes/get-routines')
const createRoutineRoute = require("./routes/create-routine");
const removeRoutineRoute = require("./routes/remove-routine");

// DATABASE IMPLEMENTATION
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connect", () => {
  console.log("connected to database");
});
const sessionStore = new MongoStore({mongooseConnection: mongoose.connection, collection: 'sessions'})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

app.use(
  session({
    secret: "cat",
    resave: true,
    saveUninitialized: true,
    store: sessionStore
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// ROUTES
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/get-routines", getRoutinesRoute)
app.use("/create-routine", createRoutineRoute);
app.use("/remove-routine", removeRoutineRoute)



app.listen(3001, () => {
  console.log("listening on port 3001");
});

