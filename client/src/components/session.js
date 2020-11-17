import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExerciseDisplay from './subcomponents/exerciseDisplay'
const axios = require('axios')

function Session(){
  const [data, setData] = useState(null)
  let slug = useParams()
  console.log(slug.routineID)

  useEffect(async() => {
    try {
      await axios.post("/start-session", {"routine": slug.routineID});
    } catch (error) {
      console.log(error);
    }
    let SessionData = [
      {
        _id: "5fb2bd5a6de0892628f2f064",
        exerciseName: "Dip",
        sets: 3,
        reps: 8,
        weight: [0],
      },
      {
        _id: "5fb2bd5a6de0892628f2f065",
        exerciseName: "Push Up",
        sets: 3,
        reps: 8,
        weight: [0],
      },
      {
        _id: "5fb2bd5a6de0892628f2f066",
        exerciseName: "Bench Press",
        sets: 3,
        reps: 8,
        weight: [0],
      },
      {
        _id: "5fb2bd5a6de0892628f2f067",
        exerciseName: "Tricep Extensions",
        sets: 3,
        reps: 8,
        weight: [0],
      },
    ];
    setData(SessionData)
  }, [])

  let exercises = [];
  if (data){
    for (let exercise of data){
      exercises.push(<ExerciseDisplay data={exercise}/>)
    }
  }

  return(
    <>
      <h1>Routine</h1>
      {exercises}
    </>
  )
}

export default Session