import React, { useState, useEffect } from "react";
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
    console.log(data)
    setSessionData(data)
    setSessionTime(data.startTime)
    setRoutineName(data.routineName)
    setTotalWeight(data.totalWeight)
    setSessionLength(data.length)
    setExercises(data.exercises)
    setSessionId(data._id)
  }, [])


  return (sessionData) ? (
    <div>
      <p>{routineName}</p>
      <p>Start Time: {sessionTime}</p>
      <p>Total Weight: {totalWeight}</p>
      <p>Total Time: {sessionLength}</p>
    </div>
  ) : null
      
   
  
}

export default SessionCard