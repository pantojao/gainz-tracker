import React, { useState, useEffect } from "react";
import WeightInput from './weightInput.js'
function ExerciseDisplay(props) {
  const [exerciseName, setExerciseName] = useState("the exercise");
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("3");
  const [maxWeight, setMaxWeight] = useState(0);
  const [averageWeight, setAverageWeight] = useState(77);

  let data = props.data

  useEffect(() => {
    let maxWeight = data.weight.reduce((a, b) => Math.max(a, b));
    let averageWeight = Math.floor(
      data.weight.reduce((a, b) => a + b) / data.weight.length
    );

    setExerciseName(data.exerciseName);
    setSets(data.sets);
    setReps(data.reps);
    setAverageWeight(averageWeight);
    setMaxWeight(maxWeight);
  }, []);
  
  let setsColumn = []
  let weightColumn = []
  let lbColumn = []
  let repsColumn = []

  for (let i=1; i<=sets; i++){
    setsColumn.push(<p>{i}</p>)
    weightColumn.push(<p>{`${maxWeight} / ${averageWeight}`}</p>)
    lbColumn.push(<WeightInput /> )
    repsColumn.push( <p>{reps}</p>)
  }

  return (
    <div>
      <h1 className="exercise-name">{exerciseName}</h1>
      <div className="exercise-table">
        <div className="set-column">
          <h2 className="exercsise-diplay-header">Set </h2>
          {setsColumn}
        </div>

        <div className="weight-history-column">
          <h2 className="exercsise-diplay-header">Max / Average</h2>
          {weightColumn}
        </div>
        
        <div className="lbs-column">
          <h2 className="exercise-diplay-header">lbs</h2>
          <p>{lbColumn}</p>
        </div>

        <div className="reps-column">
          <h2 className="exercise-diplay-header">Reps</h2>
          <p>{repsColumn}</p>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDisplay;

