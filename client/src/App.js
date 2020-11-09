
import React from "react";
import NewSession from "./components/newSession";
import Routines from './components/routines'
import { BrowserRouter as Router,

  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/new-session">
            <NewSession />
          </Route>
          
        <Route path="/Routines">
          <Routines /> 
        </Route>
      </Switch>
        
        
      </Router>


      

    </div>
  );
}

export default App;
