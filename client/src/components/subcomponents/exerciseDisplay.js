import React, { useState, useEffect } from "react";
import WeightInput from './weightInput.js'

function ExerciseDisplay(props) {
  const [exerciseName, setExerciseName] = useState(null);
  const [exerciseId, setExerciseId] = useState(null)
  const [sets, setSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [maxWeight, setMaxWeight] = useState(null);
  const [averageWeight, setAverageWeight] = useState(null);
  const [currentWeight, setCurrentWeight] = useState([])

  useEffect(() => {
    let data = props.data
    let MaxWeight = data.weight.reduce((a, b) => Math.max(a, b));
    let AverageWeight = Math.floor(
      data.weight.reduce((a, b) => a + b) / data.weight.length
    );
    let weights = [];
    for (let i=0; i< data.sets; i++){
      weights.push(MaxWeight)
    }
    setExerciseId(data._id)
    setExerciseName(data.exerciseName);
    setSets(data.sets);
    setReps(data.reps);
    setAverageWeight(AverageWeight);
    setMaxWeight(MaxWeight)
    setCurrentWeight(weights)
  }, []);
  

  const getInput = (weightInput, setKey) => {
    weightInput = parseInt(weightInput)
    let weights = currentWeight
    weights[setKey - 1] = weightInput
    let newWeights = weights.map((weight) => {
      if (weight==0){
        weight = weightInput
      }
      return weight
    })

    setCurrentWeight(newWeights)
  }

  let setsColumn = []
  let weightColumn = []
  let lbColumn = []
  let repsColumn = []

  for (let i=1; i<=sets; i++){
    console.log(i)
    setsColumn.push(<p className="column-value" key={i}>{i}</p>)
    weightColumn.push(<p className="column-value" key={i}>{`${maxWeight} / ${averageWeight}`}</p>)
    lbColumn.push(<WeightInput className="column-value" sendInput = {getInput} currentInput={currentWeight[i-1]} exerciseId={exerciseId} key={i} setKey={i}/> )
    repsColumn.push(<p className="column-value" key={i}>{reps}</p>)
  }  


  return (
    <div>
      <h1 className="exercise-name">{exerciseName}</h1>
      <div className="exercise-table">
        <div className="table-column">
          <h2 className="exercise-diplay-header">Set</h2>
          <div className="column-values">
            {setsColumn}
          </div>
        </div>

        <div className="table-column">
          <h2 className="exercise-diplay-header">Max/Avg</h2>
          <div className="column-values">
            {weightColumn}
          </div>
        </div>
        
        <div className="table-column">
          <h2 className="exercise-diplay-header">lbs</h2>
          <div className="column-values">
            {lbColumn}
          </div>
        </div>

        <div className="table-column">
          <h2 className="exercise-diplay-header">Reps</h2>
          <div className="column-values">
            {repsColumn}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseDisplay;

