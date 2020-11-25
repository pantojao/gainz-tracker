import React, { useState, useEffect } from "react";
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function RestTimer() {
  const [interval, setInterval] = useState(45)
  const [startTimer, setStartTimer] = useState(false)

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">0</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };
  
  const Timer = (props) => {
    let time = parseInt(interval)
    if (!time) time=45
    return(
      <CountdownCircleTimer isPlaying={startTimer} duration={time} size={props.size} strokeWidth={props.lineThickness} colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]} >
        {renderTime}
      </CountdownCircleTimer>
    )
  }

  
  
  const setTime = (event) => setInterval(event.target.value)
  const start =() => setStartTimer(!startTimer)
  

  return (
    <>
      <div id="PopoverLegacy" type="button">
        <Timer size={80} lineThickness={5}/>
      </div>

      <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
        <PopoverHeader>Rest Timer</PopoverHeader>
        <PopoverBody>
          <div style={{display: "flex", justifyContent:"space-between", marginBottom: "1em"}}>
            <input type="number" className="form-control" defaultValue={45} value={interval} min="1" placeholder='45' onChange={(event) => setTime(event)}/> 

            {startTimer ? 
              <button className="btn btn-danger" onClick={() => start()}>Stop</button> 
              :
              <button className="btn btn-primary" onClick={() => start()}>start</button>
            }
    
          </div>
          {/* <Timer /> */}
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}

export default RestTimer;
