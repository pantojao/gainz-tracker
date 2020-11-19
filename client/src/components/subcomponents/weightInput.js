import React, { useState, useEffect, useRef } from "react";
import EditInput from "./editInput";

function WeightInput(props){
  const [editWeight, setEditWeight] = useState(false)
  const [weightInput, setWeightInput] = useState(props.currentInput)
  const textInput = useRef(null);

  useEffect(() => {
    if (props.currentInput > 0){
      setWeightInput(props.currentInput)
    }
  }, [props.currentInput])

  useEffect(() => {
    if (editWeight){
      textInput.current.focus();
    }
  }, [editWeight]);

  const handleChange = (event) => {setWeightInput(event.target.value)}
  const handleSubmit = (event) => {
    event.preventDefault()
    if (event.target.value==""){setWeightInput(0)}
    setEditWeight(!editWeight)
    props.sendInput(event.target.value, props.setKey)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter'){
      handleSubmit(event)
    }
  }

  if (editWeight){
    return (
    <form className="weight-input-form" onSubmit={(event) => handleSubmit(event)} >
      <input ref={textInput} onKeyDown={(event)=>handleKeyDown(event)} onBlur={(event) =>handleSubmit(event)} className="form-control weight-num-input" type="number" value={weightInput} onChange = {(event) => handleChange(event)}  min="1" required aria-required="true" />
     </form>
     )
  } 
  return(<p className="weight-display" onClick={()=>setEditWeight(!editWeight)}>{weightInput}</p>)
   
}

export default WeightInput

