import React, { useState, useEffect, useRef} from "react";
import SessionCard from '../subcomponents/sessionCard'
const axios = require('axios')

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop) 

function SessionHistory(props){
  const [data, setData] = useState(null)
  const [displayFull, setDisplayFull] = useState(false)
  const [sessionCards, setSessionCards] = useState(null)
  const [dateFilter, setDateFilter] = useState(null)

  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)
  
  useEffect(async() => {
    let serverResponse = await axios.post("/session-history")
    setData(serverResponse.data)
  }, [])

  useEffect(() =>{
    if (dateFilter){
      let SessionCards = []
      let date = dateFilter.split('-').join('/')

      for (let session of data){
        if(session.startTime.split(',')[0]==date){
          SessionCards.push(
          <div key={session._id} ref ={myRef}>
            <SessionCard data={session} key={session._id}/>
          </div>)

        } else {
          SessionCards.push(
          <div key={session._id} ref = {myRef}>
            <SessionCard data={session} key={session._id}/>
          </div>)
        }
      }
      setSessionCards(SessionCards)
    }
  }, [dateFilter])


  let SessionCards = []
  if (data && !sessionCards){
    for(let session of data){
      console.log(session.startTime)
      SessionCards.push(
      <div key={session._id} >
        <SessionCard data={session} key={session._id}/>
      </div>
      )}
    SessionCards.reverse()
    setSessionCards(SessionCards)
  }
 


  const handleChange=(event) => {
    console.log(event.target.value)
    setDateFilter(event.target.value)
  }
  
  return(
    <>
    <h1 className="session-history-title">Session History</h1>
    <div style={{width: "16em"}}>
      <label className="col-2 col-form-label">Date</label>
      <input className="form-control" type="date" defaultValue='2020-08-19' id="example-date-input" onChange={(event) => handleChange(event)}/>
    </div>
    <button onClick={() =>executeScroll()}>Find</button>
    {sessionCards}
    </>
  )
}

export default SessionHistory