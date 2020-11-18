import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExerciseDisplay from './subcomponents/exerciseDisplay'
const axios = require('axios')

function Session(){
  const [data, setData] = useState(null)
  const [routineName, setRoutineName] = useState(null)
  const [weightData, setWeightData] = useState([])
  const [inputError, setInputError] = useState(null)
  const [startTime, setStartTime] = useState(null)

  let slug = useParams()

  useEffect(async() => {
    try {
      let serverResponse = await axios.post("/start-session", {"routine": slug.routineID});
      setData(serverResponse.data)
      setRoutineName(serverResponse.data.routineName)
      setStartTime(new Date().toLocaleString())
    } catch (error) {
      console.log(error);
    }
  }, [])

  const recieveWeights = (exerciseWeight) => {
    let WeightData = weightData
    if (WeightData.length===0) WeightData.push(exerciseWeight)
    else{
      let index = WeightData.findIndex((exercise) => exercise.exerciseId==exerciseWeight.exerciseId)
      if (index<0) WeightData.push(exerciseWeight)
      else WeightData[index] = exerciseWeight
    }
    setWeightData(WeightData)
  }

  let exercises = [];
  if (data){
    for (let exercise of data.exercises){
      exercises.push(<ExerciseDisplay data={exercise} id ={exercise._id} sendWeight={recieveWeights} key={exercise._id}/>)
    }
  }

  const verifyInput = () => {
    console.log(weightData)
    if (data.exercises.length !== weightData.length){
      setInputError("Please Fill Out Input")
      return false
    }

    for (let exercise of weightData){
      for (let weight of exercise.weights.newWeights){
        if (weight <= 0 || Number.isNaN(weight)){
          setInputError("Please Fill Out Input")
          console.log("error")
          return false
        }
      }
    }
    return true
  }
  
  const finishSession = async() => {
    if (verifyInput()){
      let data = {"startTime": startTime,"routineName": routineName,"exercises": weightData}

      try {
        const config = {
          headers: {
            "Content-Type": "application/JSON",
          },
        };
        let serverResponse = await axios.post("/finish-session", data, config);
      } catch (error) {
        console.log(error);
      }
    }

  }

  return(
    <>
    <div className="session-btns">
      <button className="rest-timer-btn">
        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-stopwatch text-primary" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07A7.001 7.001 0 0 1 8 16 7 7 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3zm0 2.1a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 0 1 .5-.5z"/>
        </svg>
      </button>
      {(inputError) ? <p>Please insert weight for all sets</p> : <p>Lets Get Started</p>}
      <button onClick={() => finishSession()} className="btn btn-md btn-success finish-session-btn">Finish</button>
    </div>
    <h1 className="session-name">{routineName}</h1>
    {exercises}
    </>
  )
}

export default Session