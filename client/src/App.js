import { React, useEffect, useState } from "react";
import Routines from "./routineComponents/routines";
import Login from "./signInComponents/login.js";
import Register from "./signInComponents/register";
import CreateRoutine from "./routineComponents/createRoutine";
import EditRoutine from "./routineComponents/editRoutine";
import Session from "./sessionComponents/session";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SessionHistory from "./sessionComponents/sessionHistory";
import NavigationMenus from "./navigation";
import Axios from "axios";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(async() => {
      let serverResponse = await Axios.get("/authenticate-user");
      if (serverResponse.data && !loggedIn) {
        setLoggedIn(true);
      } else if (!serverResponse.data && loggedIn) {
        setLoggedIn(false);
      }
  },[])

  const getAuthentication = (authenticated) => {
    if (authenticated){
      setLoggedIn(true) 
    }
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login authenticatedUser={getAuthentication} />
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
            ) : null}
          </Route>

          <Route path="/routines">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <Routines />
              </>
            ) : null}
          </Route>

          <Route path="/edit-routine">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <EditRoutine />
              </>
            ) : null}
          </Route>

          <Route path="/session/:routineID">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <Session />
              </>
            ) : null}
          </Route>

          <Route path="/session-history">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <SessionHistory />
              </>
            ) : null}
          </Route>
        </Switch>
      </Router>
    </div>
  ) 
}

export default App;
