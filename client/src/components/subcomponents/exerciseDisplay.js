import React, { useState, useEffect } from "react";
import WeightInput from './weightInput.js'
import CheckIcon from '../icons/check'
function ExerciseDisplay(props) {
  const [exerciseName, setExerciseName] = useState(null);
  const [exerciseId, setExerciseId] = useState(null)
  const [sets, setSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [userWeights, setUserWeights] = useState(null)
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
      weights.push(0)
    }
    setExerciseId(data._id)
    setUserWeights(data.weight)
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
    props.sendWeight({"exerciseId": exerciseId, "exerciseName": exerciseName, "sets": sets, "reps": reps, "exerciseAverage":averageWeight, "exerciseMax": maxWeight, "weights": {"userWeights": userWeights, "newWeights": newWeights}})
    setCurrentWeight(newWeights)
  }

  const getCheckStatus = (status) => {
    props.sendChecks(status)
  }
  
  let setsColumn = []
  let lbColumn = []
  let repsColumn = []
  let checkMarks = []

  for (let i=1; i<=sets; i++){
    setsColumn.push(<p className="column-value" key={i}>{i}</p>)
    lbColumn.push(<WeightInput className="column-value" sendInput = {getInput} currentInput={currentWeight[i-1]} exerciseId={exerciseId} key={i} setKey={i}/> )
    repsColumn.push(<p className="column-value" key={i}>{reps}</p>)
    checkMarks.push(<div className="column-value"><CheckIcon key={i} confirmCheck ={getCheckStatus}/></div>)
  }  

  
  return (
    <div>
      <div className='session-exercise-header'>
        <h1 className="exercise-name">{exerciseName}</h1>
        <div className="exercise-stats">
          <p className="exercise-stat">Max: {maxWeight}</p>
          <p className="exercise-stat">Average: {averageWeight}</p>
        </div>
      </div>
      
      <div className="exercise-table">
        <div className="table-column">
          <h2 className="exercise-diplay-header">Set</h2>
          <div className="column-values">
            {setsColumn}
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
        <div className="check-column">
            {checkMarks}
        </div>
      </div>
    </div>
  )
}

export default ExerciseDisplay;

