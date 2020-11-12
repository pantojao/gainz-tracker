import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function Routines(props) {
  const [userRoutines, setUserRoutines] = useState(null);

  useEffect(async () => {
    let serverResponse = await axios.get("get-routines");
    setUserRoutines(serverResponse.data);
    console.log(serverResponse.data);
  }, []);

  let userCards = [];

  if (userRoutines !== null) {
    userRoutines.forEach((routine) => {
      let exercises = [];
  
      routine.exercises.forEach((exercise) => {
        exercises.push(exercise.exerciseName.split("+").join(" ") + ", ");
      });
      exercises[exercises.length -1] = exercises[exercises.length -1].replace(/,\s*$/, "");
      
      userCards.push(
        <div className="your-routine" key={routine._id}>
          <h2>{routine.routineName.split("+").join(" ")}</h2>
          <p>{exercises}</p>
        </div>
      );
    });
  }

  return (
    <div className="routines">
      <button className="btn btn-dark create-routine-btn"><Link to='/new-routine'>Create Routine</Link></button>
      <h2 className="your-routines-header">Your Routines</h2>
      <div className="your-routines">{userCards}</div>

      <h2 className="default-routines-header">Default Routines</h2>
      <div className="default-routines">
        <div className="default-card">
          <h2>Push</h2>
          <p>Bench Press, Dips, Overhead Press, Chest Flys, Tricep Extension</p>
        </div>
        <div className="default-card">
          <h2>Pull</h2>
          <p>Pull Ups, Lat Pulldowns, Curls, Rows</p>
        </div>
        <div className="default-card">
          <h2>Legs</h2>
          <p>Squats, Calve Raises, Leg Curls, Lunges, Hamstring Curls</p>
        </div>
      </div>
    </div>
  );
}

export default Routines;
