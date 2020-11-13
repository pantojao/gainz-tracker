import React from "react";
import Routines from './components/routines'
import Login from './components/login.js'
import Register from './components/register'
import CreateRoutine from './components/createRoutine'
import EditRoutine from './components/editRoutine'
import { BrowserRouter as Router , Switch, Route } from "react-router-dom";

function App() {
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
            <CreateRoutine />
        </Route>
        <Route path="/routines">
          <Routines /> 
        </Route>
        <Route path="/edit-routine">
          <EditRoutine /> 
        </Route>
      </Switch> 
    </Router>

    </div>
  );
}

export default App;
