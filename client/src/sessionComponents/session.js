import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ExerciseDisplay from "../subcomponents/exerciseDisplay";
import RestTimer from '../subcomponents/restTimer'
const axios = require("axios");

function Session() {
  const [data, setData] = useState(null);
  const [routineName, setRoutineName] = useState(null);
  const [weightData, setWeightData] = useState([]);
  const [inputError, setInputError] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [checks, setChecks] = useState(1);
  const [sets, setSets] = useState(null);

  const history = useHistory();
  let slug = useParams();

  useEffect(async () => {
    try {
      let serverResponse = await axios.post("/start-session", {
        routine: slug.routineID,
      });
      setData(serverResponse.data);
      setRoutineName(serverResponse.data.routineName);
      setStartTime(new Date().toLocaleString());

      let sets = 0;
      for (let exercise of serverResponse.data.exercises) {
        sets = exercise.sets + sets;
      }
      setSets(sets);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const recieveWeights = (exerciseWeight) => {
    let WeightData = weightData;
    if (WeightData.length === 0) WeightData.push(exerciseWeight);
    else {
      let index = WeightData.findIndex(
        (exercise) => exercise.exerciseId == exerciseWeight.exerciseId
      );
      if (index < 0) WeightData.push(exerciseWeight);
      else WeightData[index] = exerciseWeight;
    }
    setWeightData(WeightData);
  };

  const getChecks = (status) => {
    if (status === true) setChecks(checks + 1);
    else setChecks(checks - 1);
  };

  const verifyChecks = () => {
    if (checks !== sets) {
      setInputError("Finish Your Routine");
      return false;
    } else {
      return true;
    }
  };
  
  const verifyInput = () => {
    if (data.exercises.length !== weightData.length) {
      setInputError("Please Fill Out Input");
      return false;
    }

    for (let exercise of weightData) {
      for (let weight of exercise.weights.newWeights) {
        if (weight <= 0 || Number.isNaN(weight)) {
          setInputError("Please Fill Out Input");
          return false;
        }
      }
    }
    return true;
  };

  const finishSession = async () => {
    if (verifyInput() && verifyChecks()) {
      let data = {
        startTime: startTime,
        routineName: routineName,
        exercises: weightData,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/JSON",
          },
        };
        let serverResponse = await axios.post("/finish-session", data, config);
        if (serverResponse.data == "Session Completed")
          history.push("/session-history");
      } catch (error) {
        console.log(error);
      }
    }
  };

  let exercises = [];
  if (data) {
    for (let exercise of data.exercises) {
      exercises.push(
        <ExerciseDisplay
          sendChecks={getChecks}
          data={exercise}
          id={exercise._id}
          sendWeight={recieveWeights}
          key={exercise._id}
        />
      );
    }
  }

  return (
    <>
      <div className="session-btns">
        <RestTimer />
        {/* {inputError ? <p>{inputError}</p> : <p>Lets Get Started</p>} */}
        <button
          onClick={() => finishSession()}
          className="btn btn-md btn-success finish-session-btn"
        >
          Finish
        </button>
      </div>
      <h1 className="session-name">{routineName}</h1>
      {exercises}
    </>
  );
}

export default Session;
