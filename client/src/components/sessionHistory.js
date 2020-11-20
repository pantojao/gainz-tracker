import { use } from "passport";
import React, { useState, useEffect } from "react";
import SessionCard from './subcomponents/sessionCard'
const axios = require('axios')

function SessionHistory(props){
  const [data, setData] = useState(null)
  const [displayFull, setDisplayFull] = useState(false)
  
  useEffect(async() => {
    let serverResponse = await axios.post("/session-history")
    console.log(serverResponse.data)
    setData(serverResponse.data)
  }, [])

  let sessionCards = []
  if (data)
  for(let session of data){
    sessionCards.push(<SessionCard data={session} key = {session._id}/>)
  }
  
  return(
    <>
    <h1 className="session-history-title">Session History</h1>
    {sessionCards}
    </>
  )
}

export default SessionHistory