import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExerciseDisplay from './subcomponents/exerciseDisplay'
const axios = require('axios')

function Session(){
  const [data, setData] = useState(null)
  let slug = useParams()

  useEffect(async() => {
    try {
      let serverResponse = await axios.post("/start-session", {"routine": slug.routineID});
      setData(serverResponse.data)
      console.log(serverResponse.data)
    } catch (error) {
      console.log(error);
    }
  }, [])

  let exercises = [];
  if (data){
    for (let exercise of data.exercises){
      exercises.push(<ExerciseDisplay data={exercise} id ={exercise._id} key={Math.floor((Math.random() * 100000000) + 1)}/>)
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