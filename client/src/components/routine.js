import React, {useState, useEffect} from 'react'
import ExerciseCard from './exerciseCard'
function RoutineCard(props) {
  return (
    <div className="Routine-card">
      <h1>{props.routineName}</h1>
      <ExerciseCard exercise="Exercise 1" prev="3 x 5 lbs"/> 
      <ExerciseCard exercise="Exercise 2" prev="3 x 5 lbs"/> 
      <ExerciseCard exercise="Exercise 3" prev="3 x 5 lbs"/> 
      <ExerciseCard exercise="Exercise 4" prev="3 x 5 lbs"/> 
    </div>
  );
}

export default RoutineCard