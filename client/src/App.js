import React from "react";
import Routines from './routineComponents/routines'
import Login from './signInComponents/login.js'
import Register from './signInComponents/register'
import CreateRoutine from './routineComponents/createRoutine'
import EditRoutine from './routineComponents/editRoutine'
import Session from './sessionComponents/session'
import { BrowserRouter as Router , Switch, Route } from "react-router-dom";
import SessionHistory from './sessionComponents/sessionHistory'
import SessionCard from './subcomponents/sessionCard'
import NavigationMenus from './navigation'

function App() {
  return (
    <div className="App">
     <NavigationMenus />
     <Router>
      <Switch>
        <Route exact path="/">
            <Login />
        </Route>
       <Route path="/register">
          <Register /> 
        </Route>
        <Route path="/new-routine">
            <CreateRoutine />
        </Route>
        <Route path="/routines">
          <Routines /> 
        </Route>
        <Route path="/edit-routine">
          <EditRoutine /> 
        </Route>
        <Route path="/session/:routineID">
            <Session />
        </Route>
        <Route path="/session-history">
          <SessionHistory />
        </Route>
      </Switch> 
    </Router>
    </div>
  );
}

export default App;
