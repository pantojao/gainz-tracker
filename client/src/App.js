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
import LoadingIcon from "./components/icons/loading";


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

  const notAuthenticated = <LoadingIcon loggedIn={loggedIn}/> 

  console.log(loggedIn)
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
            ) : notAuthenticated}
          </Route>

          <Route path="/routines">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <Routines />
              </>
            ) : notAuthenticated}
          </Route>

          <Route path="/edit-routine">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <EditRoutine />
              </>
            ) : notAuthenticated}
          </Route>

          <Route path="/session/:routineID">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <Session />
              </>
            ) : notAuthenticated}
          </Route>

          <Route path="/session-history">
            {loggedIn ? (
              <>
                <NavigationMenus />
                <SessionHistory />
              </>
            ) : notAuthenticated}
          </Route>
            
        </Switch>
      </Router>
    </div>
  ) 
}

export default App;
