require("dotenv").config();
const ejs = require("ejs");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const mongodb = require("mongodb");
const ObjectID = require("mongodb").ObjectID;
const app = express();

var proxy = require("express-http-proxy");

const loginRoute = require("./routes/login");
const homePageRoute = require("./routes/homepage");
const registerRoute = require("./routes/register");
const newSessionRoute = require("./routes/new-session");
const sessionsRoute = require("./routes/sessions");
const progressRoute = require("./routes/progress");
const usersRoute = require("./routes/users");
const getRoutinesRoute = require('./routes/get-routines')
// const createRoutineRoute = require("./routes/create-routine");

const { User } = require("./models/userModel");

app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connect", () => {
  console.log("connected to database");
});

app.use("/", loginRoute);
app.use("/homepage", homePageRoute);
app.use("/register", registerRoute);
app.use("/new-session", newSessionRoute);
app.use("/sessions", sessionsRoute);
app.use("/progress", progressRoute);
app.use("/users", usersRoute);
app.use("/proxy", proxy("http://localhost:3000"));
app.use("/get-routines", getRoutinesRoute)
// app.use("/create-routine", createRoutineRoute);

app.listen(3001, () => {
  console.log("listening on port 3001");
});
