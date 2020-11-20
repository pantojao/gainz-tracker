import React, { useState, useEffect } from "react";
import TrophyIcon from '../icons/trophy'
import ImprovementIcon from '../icons/improvement'
import ClockIcon from '../icons/clock'
import CollapseIcon from '../icons/collapse'
import ExpandIcon from '../icons/expand'

const axios = require('axios')

function SessionCard(props){
  const [sessionData, setSessionData] = useState(null)
  const [routineName, setRoutineName] = useState(null)
  const [totalWeight, setTotalWeight] = useState(null)
  const [sessionLength, setSessionLength] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [sessionTime, setSessionTime] = useState(null)
  const [maxWeight, setMaxWeight] = useState(null)
  const [displayFull, setDisplayFull] = useState(props.displayFull)

  useEffect(() => {
    let data = props.data
    for (let exercise of data.exercises){
      exercise.max = 0
    }

    let max = 0; 
    for (let exercise of data.exercises){
      for (let weight of exercise.weights){
        if (weight > max) max = weight
      }
    }

    // console.log(data)
    setMaxWeight(max)
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
                {(weight > exercise.max) ? <TrophyIcon fill={true}/> : <TrophyIcon fill={false}/>}
               </div>
             </div>
           )}
      </div>
    )
    rowIndex++
    cards.push(card)
  }
  

// DISPLAY VERSION
  let displayCards = []
  if (exercises)
  for (let exercise of exercises){
    let card =(
      <div className="exercise-card-half">
        <div className="exercise-headers-half">
          <h2 className="exercise-header-half">{exercise.exerciseName}</h2>
          <p className="exercise-header-half">{ `${maxWeight}lbs`}</p>
          {(maxWeight > exercise.max) ? <TrophyIcon fill={true}/> : <TrophyIcon fill={false}/>}
        </div>
      </div>
    )
    displayCards.push(card)
  }
  

  return (displayFull) ? (
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
  ) : 
  (!displayFull) ?
    <div className="session-card-header-half">
      <div className="session-card-top-half">
        <h1 className="session-card-title-half">{routineName}</h1>
        <ExpandIcon />
      </div>
      <p className="session-card-data-half">Start Time: {sessionTime}</p>
      <div className="session-card-details-half" >
        <p><ClockIcon /> {sessionLength}</p>
        {/* <p>Total Weight: {totalWeight} lbs</p> */}
      </div>
      {displayCards}
    </div>
  : null
      
   
  
}

export default SessionCard