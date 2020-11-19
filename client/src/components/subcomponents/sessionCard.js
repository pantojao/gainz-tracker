import React, { useState, useEffect } from "react";
import TrophyIcon from '../icons/trophy'
import ImprovementIcon from '../icons/improvement'
import ClockIcon from '../icons/clock'
const axios = require('axios')

let data = [{"_id":"5fb5b6b0ba11093f74efcc1f","exercises":[{"weights":[1,1,1],"_id":"5fb5b6b0ba11093f74efcc20","exerciseName":"Squat","reps":8,"sets":3,"average":0},{"weights":[1,1,1],"_id":"5fb5b6b0ba11093f74efcc21","exerciseName":"Leg Press","reps":8,"sets":3,"average":0},{"weights":[1,1,1],"_id":"5fb5b6b0ba11093f74efcc22","exerciseName":"Hamstring Curls","reps":8,"sets":3,"average":0}],"routineName":"Leg Day","startTime":"11/18/2020, 2:10:38 PM","endTime":"11/18/2020, 4:05:04 PM","length":"1 Hour 54 minutes","totalWeight":9},{"_id":"5fb5b790909fc6167ce3c056","exercises":[{"weights":[1,1,1],"_id":"5fb5b790909fc6167ce3c057","exerciseName":"Squat","reps":8,"sets":3,"average":0},{"weights":[1,1,1],"_id":"5fb5b790909fc6167ce3c058","exerciseName":"Leg Press","reps":8,"sets":3,"average":0},{"weights":[4,4,4],"_id":"5fb5b790909fc6167ce3c059","exerciseName":"Hamstring Curls","reps":8,"sets":3,"average":0}],"routineName":"Leg Day","startTime":"11/18/2020, 4:08:37 PM","endTime":"11/18/2020, 4:08:48 PM","length":"0 Hour 0 minutes","totalWeight":18},{"_id":"5fb5b7a8909fc6167ce3c05a","exercises":[{"weights":[1,1,1],"_id":"5fb5b7a8909fc6167ce3c05b","exerciseName":"Squat","reps":8,"sets":3,"average":0},{"weights":[1,1,1],"_id":"5fb5b7a8909fc6167ce3c05c","exerciseName":"Leg Press","reps":8,"sets":3,"average":0},{"weights":[4,4,4],"_id":"5fb5b7a8909fc6167ce3c05d","exerciseName":"Hamstring Curls","reps":8,"sets":3,"average":0}],"routineName":"Leg Day","startTime":"11/18/2020, 4:08:37 PM","endTime":"11/18/2020, 4:09:12 PM","length":"0 Hour 0 minutes","totalWeight":18},{"_id":"5fb5b7c76cd8d40e44f35bd2","exercises":[{"weights":[1,1,1],"_id":"5fb5b7c76cd8d40e44f35bd3","exerciseName":"Squat","reps":8,"sets":3,"average":0},{"weights":[1,1,1],"_id":"5fb5b7c76cd8d40e44f35bd4","exerciseName":"Leg Press","reps":8,"sets":3,"average":0},{"weights":[4,4,4],"_id":"5fb5b7c76cd8d40e44f35bd5","exerciseName":"Hamstring Curls","reps":8,"sets":3,"average":0}],"routineName":"Leg Day","startTime":"11/18/2020, 4:09:42 PM","endTime":"11/18/2020, 4:09:42 PM","length":"0 Hour 0 minutes","totalWeight":18}]

function SessionCard(){
  const [sessionData, setSessionData] = useState(null)
  const [routineName, setRoutineName] = useState(null)
  const [totalWeight, setTotalWeight] = useState(null)
  const [sessionLength, setSessionLength] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [sessionTime, setSessionTime] = useState(null)

  useEffect(() => {
    data = data[0]
    for (let exercise of data.exercises){
      exercise.max = 0
    }

    console.log(data)
    setSessionData(data)
    setSessionTime(data.startTime)
    setRoutineName(data.routineName)
    setTotalWeight(data.totalWeight)
    setSessionLength(data.length)
    setExercises(data.exercises)
    setSessionId(data._id)
  }, [])

  let cards = []

  let rowIndex = 0 
  if (exercises)
  for (let exercise of exercises){
    let card =(
      <div className="exercise-card">
        <div className="exercise-headers">
          <h2 className="exercise-header">{exercise.exerciseName}</h2>
          {(rowIndex==0) ? <ImprovementIcon />: null}
        </div>
        {exercise.weights.map((weight, index) => 
             <div className="exercise-details">
               <p className="exercise-detail" >{index+1}</p>
               <p className="exercise-detail">{exercise.reps} reps of {weight} lbs</p>
               <div className="lift-improvements">
                <p className="average-improvement">{(weight-exercise.average > 0) ?  `+${weight-exercise.average} lb` : `-${weight-exercise.average} lb`}</p>
                {(weight > exercise.max) ? <TrophyIcon /> : null}
               </div>
             </div>
           )}
      </div>
    )
    rowIndex++
    cards.push(card)
  }
  

  

  return (sessionData) ? (
    <div>
      <div className="session-card-header">
        <h1 className="session-card-title">{routineName}</h1>
        <p className="session-card-data">Start Time: {sessionTime}</p>
        <div className="session-card-details" >
          <p><ClockIcon /> {sessionLength}</p>
          <p>Total Weight: {totalWeight} lbs</p>
        </div>
      </div>
      {cards}

    </div>
  ) : null
      
   
  
}

export default SessionCard