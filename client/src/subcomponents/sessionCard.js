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

   // FULL VERSION
  let cards = [];
  let rowIndex = 0;
  if (exercises)
    for (let exercise of exercises) {
      let card = (
        <div className="exercise-card">
          <div className="exercise-headers">
            <h2 className="exercise-header">{exercise.exerciseName}</h2>
            {rowIndex == 0 ? <ImprovementIcon /> : null}
          </div>
          {exercise.weights.map((weight, index) => (
            <div className="exercise-details">
              <p className="exercise-detail">{index + 1}</p>
              <p className="exercise-detail">
                {exercise.reps} reps of {weight} lbs
              </p>
              <div className="lift-improvements">
                <p className="average-improvement">
                  {weight - exercise.average > 0
                    ? `+${weight - exercise.average} lb`
                    : `${weight - exercise.average} lb`}
                </p>
                {weight > exercise.max ? (
                  <TrophyIcon fill={true} />
                ) : (
                  <TrophyIcon fill={false} />
                )}
              </div>
            </div>
          ))}
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
        <div className="exercise-card-half">
          <div className="exercise-headers-half">
            <h2 className="exercise-header-half">{exercise.exerciseName}</h2>
            <p className="exercise-header-half">{`${exercise.maxLift}lbs`}</p>
            {exercise.hasMax ? (
              <TrophyIcon fill={true} />
            ) : (
              <TrophyIcon fill={false} />
            )}
          </div>
        </div>
      );
      displayCards.push(card);
    }

  // RENDER CONTENT

  return displayFull ? (
    <div onBlur={() => changeDisplay()}>
      <div className="session-card-header">
        <div className="session-card-top-half">
          <h1 className="session-card-title-half">{routineName}</h1>
          <ExpandIcon changeDisplay={changeDisplay} />
        </div>
        <p className="session-card-data">Start Time: {sessionTime}</p>
        <div className="session-card-details">
          <p>
            <ClockIcon /> {sessionLength}
          </p>
          <p>Total Weight: {totalWeight} lbs</p>
        </div>
      </div>
      {cards}
    </div>
    
  ) : !displayFull ? (
    <div className="session-card-header-half">
      <div className="session-card-top-half">
        <h1 className="session-card-title-half">{routineName}</h1>
        <ExpandIcon changeDisplay={changeDisplay} />
      </div>
      <p className="session-card-data-half">Start Time: {sessionTime}</p>
      <div className="session-card-details-half">
        <p>
          <ClockIcon /> {sessionLength}
        </p>
      </div>
      {displayCards}
    </div>
  ) : null;
}

export default SessionCard;
