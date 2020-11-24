import { React, useEffect, useState } from "react";
import Routines from "./routineComponents/routines";
import Login from "./signInComponents/login.js";
import Register from "./signInComponents/register";
import CreateRoutine from "./routineComponents/createRoutine";
import EditRoutine from "./routineComponents/editRoutine";
import Session from "./sessionComponents/session";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SessionHistory from "./sessionComponents/sessionHistory";
import NavigationMenus from "./navigation";
import Axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(async() => {
      let serverResponse = await Axios.get("/authenticate-user");
      console.log(serverResponse)
      if (serverResponse.data && !loggedIn) {
        setLoggedIn(true);
      } else if (!serverResponse.data && loggedIn) {
        setLoggedIn(false);
      }
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/new-routine">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <CreateRoutine />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/routines">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <Routines />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/edit-routine">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <EditRoutine />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/session/:routineID">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <Session />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/session-history">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <SessionHistory />
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

        </Switch>
      </Router>
    </div>
  ) 
}

export default App;
