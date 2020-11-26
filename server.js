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
const PORT = process.env.PORT || 3001;

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const getRoutinesRoute = require('./routes/get-routines')
const createRoutineRoute = require("./routes/create-routine");
const removeRoutineRoute = require("./routes/remove-routine");
const editRoutineRoute = require("./routes/edit-routine");
const startSessionRoute = require("./routes/start-session");
const finishSessionRoute = require("./routes/finish-session");
const sessionHistoryRoute = require("./routes/session-history");
const authenticateUserRoute = require("./routes/authenticate-user");
const logoutUserRoute = require("./routes/logout-user");
const getUserRoute = require("./routes/get-user");

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


const authenticateUser = (req, res, next) =>{
  if (req.isAuthenticated()){
    next()
  } else {
    res.send("login")
  }
}

// ROUTES
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/get-routines", getRoutinesRoute)
app.use("/create-routine", createRoutineRoute);
app.use("/remove-routine", removeRoutineRoute)
app.use("/edit-routine", editRoutineRoute)
app.use("/start-session", startSessionRoute)
app.use("/finish-session", finishSessionRoute)
app.use("/session-history", sessionHistoryRoute)
app.use("/authenticate-user", authenticateUserRoute)
app.use("/logout-user", logoutUserRoute)
app.use("/get-user", getUserRoute)


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  // Add production middleware such as redirecting to https

  app.use(express.static(__dirname + '/client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(
          path.resolve(__dirname, 'client', 'build', 'index.html')
      );
  });
}

app.listen(PORT, () => {
  console.log("listening on port 3001");
});

