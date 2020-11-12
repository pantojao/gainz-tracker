import React from "react";
import Routines from './components/routines'
import { BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './components/login.js'
import Register from './components/register'
import CreateRoutine from './components/createRoutine'
 
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

      </Switch> 
    </Router>

    </div>
  );
}

export default App;
