import { set } from "mongoose";
import React, { useState, useEffect, useRef } from "react";
import EditInput from "./editInput";

function WeightInput(props){
  const [editWeight, setEditWeight] = useState(false)
  const [weightInput, setWeightInput] = useState(props.currentInput)
  const textInput = useRef(null);



  useEffect(() => {
    if (props.currentInput > 0){
      setWeightInput(props.currentInput)
      console.log(props.currentInput)
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

  if (editWeight){
    return (
    <form className="weight-input-form" onSubmit={(event) => handleSubmit(event)} >
      <input ref={textInput} onBlur={(event) =>handleSubmit(event)} className="form-control weight-num-input" type="number" value={weightInput} onChange = {(event) => handleChange(event)} min="1" required aria-required="true" />
      <button type="submit" className="check-btn">
        <svg width="2em" height="100%" viewBox="0 0 16 16" className="bi bi-check text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
        </svg>
      </button>
     </form>
     )
  } 

  return(<p className="weight-display" onClick={()=>setEditWeight(!editWeight)}>{weightInput}</p>)
   
}

export default WeightInput