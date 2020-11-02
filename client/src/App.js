import React from 'react'
import Nav from './components/nav'
import RoutineCard from './components/routine'

function App() {
  return (
    <div className="App">
     <Nav />
     <RoutineCard routineName="Legs"/>
    </div>
  );
}

export default App;
