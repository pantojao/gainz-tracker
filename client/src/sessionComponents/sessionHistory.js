import React, { useState, useEffect, useRef} from "react";
import SessionCard from '../subcomponents/sessionCard'
const axios = require('axios')



function SessionHistory(props){
  const [data, setData] = useState(null)
  const [sessionCards, setSessionCards] = useState(null)
  const [dateFilter, setDateFilter] = useState(null)
  const [disableButton, setDisableButton] = useState(true)
  const [dateMessage, setDateMessage] = useState(null)

  const scrollToRef = (ref) => {
    const cardTop = ref.current !==null ? ref.current.offsetTop : 0
    window.scrollTo(0, cardTop)
    if (ref.current==null) setDateMessage("No Session Recorded for this date")
    else setDateMessage(null)
  } 

  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  
  useEffect(async() => {
    let serverResponse = await axios.post("/session-history")
    setData(serverResponse.data)
  }, [])

  useEffect(() =>{
    if (dateFilter){
      let SessionCards = []
     
      for (let session of data){
        if(session.startTime.split(',')[0]==dateFilter){
          SessionCards.push(
          <div key={session._id} ref ={myRef}>
            <SessionCard data={session} key={session._id}/>
          </div>)

        } else {
          SessionCards.push(
          <div key={session._id}>
            <SessionCard data={session} key={session._id}/>
          </div>)
        }
      }
      SessionCards.reverse()
      setSessionCards(SessionCards)
    }
  }, [dateFilter])


  let SessionCards = []
  if (data && !sessionCards){
    for(let session of data){
      SessionCards.push(
      <div key={session._id} >
        <SessionCard data={session} key={session._id}/>
      </div>
      )}
    SessionCards.reverse()
    setSessionCards(SessionCards)
  }

  const handleChange=(event) =>{
    let date = (event.target.value).split("-")
    let year = date[0], day = date[2], month = date[1]

    date[0] = month
    date[1] = day
    date[2] = year
    setDateFilter(date.join("/"))
    if (disableButton) setDisableButton(!disableButton)
  }
  
  
  return(
    <>
    <h1 className="session-history-title">Session History</h1>
    <div style={{display: "flex", justifyContent:"flex-start", width: "95%", margin:"0 auto", flexWrap:"wrap"}}>
      <div style={{width: "10em"}}>
        <label className="col-2 col-form-label">Date</label>
        <input className="form-control" type="date" defaultValue={(new Date()).toISOString().substr(0,10)} id="example-date-input" onChange={(event) => handleChange(event)}/>
      </div>
      <button style={{width: "5em", height: "2.5em", alignSelf:"flex-end", marginLeft: "1em"}} className="btn btn-dark" disabled={disableButton} onClick={() =>executeScroll()}>Find</button>
    </div> 

    <p style={{textAlign: "center"}}>{dateMessage}</p>
    
    {sessionCards}
    </>
  )
}

export default SessionHistory