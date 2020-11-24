import React, { useState, useEffect } from "react";
import TrophyIcon from "../components/icons/trophy";
import ImprovementIcon from "../components/icons/improvement";
import ClockIcon from "../components/icons/clock";
import ExpandIcon from "../components/icons/expand";

const axios = require("axios");

function SessionCard(props) {
  const [sessionData, setSessionData] = useState(null);
  const [routineName, setRoutineName] = useState(null);
  const [totalWeight, setTotalWeight] = useState(null);
  const [sessionLength, setSessionLength] = useState(null);
  const [exercises, setExercises] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [sessionTime, setSessionTime] = useState(null);
  const [displayFull, setDisplayFull] = useState(false);

  useEffect(() => {
    let data = props.data;

    setSessionData(data);
    setSessionTime(data.startTime);
    setRoutineName(data.routineName);
    setTotalWeight(data.totalWeight);
    setSessionLength(data.length);
    setExercises(data.exercises);
    setSessionId(data._id);
  }, []);

  const changeDisplay = () => {
    setDisplayFull(!displayFull);
  };

  //  FULL VERSION
  let cards = [];
  let rowIndex = 0;
  if (exercises)
    for (let exercise of exercises) {
      let card = (
        <div className="exercise-card" key={exercise._id}>
          <div className="exercise-headers">
            <h2 className="exercise-header light-text">{exercise.exerciseName}</h2>
            {rowIndex == 0 ? <ImprovementIcon /> : null}
          </div>
          {exercise.weights.map((weight, index) => (
            <div className="exercise-details" key={index}>
              <p className="exercise-detail light-text">{index + 1}</p>
              <p className="exercise-detail light-text">
                {exercise.reps} reps of {weight} lbs
              </p>
              <div className="lift-improvements">
                  <p className="average-improvement light-text">
                    {weight - exercise.average > 0
                      ? `+${weight - exercise.average} lb`
                      : `${weight - exercise.average} lb`}
                  </p>
              
                {weight > exercise.max ? (
                  <TrophyIcon fill={true} max={exercise.max} key={exercise._id}/>
                ) : (
                  <TrophyIcon fill={false} max={exercise.max} key={exercise._id}/>
                )}
              </div>
            </div>
          ))}
          <div style={{display: "flex", justifyContent:"space-between", marginTop: ".5em"}}>
            <p className="light-text"> {`Average: ${exercise.average}`}</p>
            <p className="light-text">{`Prev Max: ${exercise.max}`}</p>
          </div>
        </div>
      );
      rowIndex++;
      cards.push(card);
    }

  // HALF VERSION
  let displayCards = [];
  if (exercises)
    for (let exercise of exercises) {
      let card = (
        <div className="exercise-card-half" key={exercise._id}>
          <div className="exercise-headers-half light-text">
            <h2 className="exercise-header-half light-text">{exercise.exerciseName}</h2>
            <p className="exercise-header-half light-text">{`${exercise.maxLift}lbs`}</p>
            {exercise.hasMax ? (
              <TrophyIcon fill={true} max={exercise.max} key={exercise._id}/>
            ) : (
              <TrophyIcon fill={false} max={exercise.max} key={exercise._id}/>
            )}
          </div>
        </div>
      )
      displayCards.push(card);
    }




  // RENDER CONTENT
  return displayFull ? (
    <div className="session-card-header" onBlur={() => changeDisplay()}>
      <div>
        <div className="session-card-top-half">
          <h1 className="session-card-title-half light-text">{routineName}</h1>
          <ExpandIcon changeDisplay={changeDisplay} />
        </div>
        <p className="session-card-data light-text">Start Time: {sessionTime}</p>
        <div className="session-card-details">
          <p className='light-text'>
            <ClockIcon /> {sessionLength}
          </p>

          <p className="light-text">Total Weight: {totalWeight} lbs</p>
        </div>
      </div>
      {cards}
    </div>
    
  ) : !displayFull ? (
    <div className="session-card-header-half">
      <div className="session-card-top-half">
        <h1 className="light-text session-card-title-half">{routineName}</h1>
        <ExpandIcon changeDisplay={changeDisplay} />
      </div>
      <p className="light-text session-card-data-half">Start Time: {sessionTime}</p>
      <div className="light-text session-card-details-half">
        <p className="light-text session-length">
          <ClockIcon /> {sessionLength}
        </p>
      </div>
      {displayCards}

    </div>
  ) : null;
}

export default SessionCard;
