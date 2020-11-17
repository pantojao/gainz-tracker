import React, {useEffect, useState} from "react"
import EditInput from "./subcomponents/editInput";
const axios = require("axios")

function EditRoutines(props) {
  const [routineName, setRoutineName] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [exerciseNumber, setExerciseNumber] = useState(null);
  const [data, setData] = useState([]);
  const [sendData, setSendData] = useState(false)
  const [editMode, setEditMode] = useState(false);

  // WILL RUN WILL PAGE IS FIRST RENDERED
  useEffect(async () => {
    let routineToEdit =  props.routines.filter((exercises => exercises._id === props.routineKey))
    setRoutineName(routineToEdit[0].routineName)
    setExercises(routineToEdit[0].exercises)
    setData(routineToEdit[0].exercises)
    console.log("setExercises")
  },[])

  useEffect(async () => {
    if (sendData){   
      let newRoutine = {}
      newRoutine["exercises"] = data
      newRoutine["routineKey"] = props.routineKey
      newRoutine["routineName"] = routineName
      
      console.log(newRoutine)
      try {
        const config = {
          headers: {
            "Content-Type": "application/JSON",
          },
        };
        let serverResponse = await axios.post("/edit-routine", newRoutine , config); 
        console.log(serverResponse)
      } catch (error) {
        console.log(error);
      }
    }
  }, [sendData])

  // COMPONENT FUNCTIONS
  const addInput = () => setExerciseNumber(exerciseNumber + 1)
  const handleCancel = () => props.parentCallBack("done")
  const editTitle = () => setEditMode(!editMode);
  const changeRoutineName = () => setEditMode(!editMode);

  const editRoutine = (event) => setSendData(!sendData)
  

  // CALLBACK FUNCTION TO RETRIEVE INPUTS
  const callBackFunction = (childData) => {
    let Data = data;
    let index = Data.findIndex((input) => input._id == childData._id);
    if (index >= 0) Data[index] = childData;
    else if (childData.id === "delete") Data.splice(index, 1);
    else  Data = [...Data, childData];
    setData(Data);
  };

  // DETERMINES THE NUMBER OF INPUTS THAT WILL BE DISPLAYED
  let exercisesInputs = []
  if(exercises!==null){
    for (let exercise of exercises){
      exercisesInputs.push(<EditInput weights={exercise.weight} exerciseName = {exercise.exerciseName} key={exercise._id} exerciseId={exercise._id} reps={exercise.reps} sets = {exercise.sets} parentCallBack={callBackFunction}/>)
    }
    if (exerciseNumber>0){
      for (let i = 0; i < exerciseNumber; i++){
        exercisesInputs.push(<EditInput weights={[]} key={i} exerciseId={i} parentCallBack={callBackFunction}/>)
      }
    }
  }

  // CODE TO EDIT ROUTINE TITLE
  const RoutineName = editMode ? (
    <form
      className="routine-name"
      onSubmit={(event) => changeRoutineName(event)}
    >
      <input
        className="form-control routine-name-input"
        type="text"
        value={routineName}
        onChange={(event) => setRoutineName(event.target.value)}
        required
        aria-required="true"
      />
      <button type="submit" className="submit-btn">
        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-check text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
        </svg>
      </button>
    </form>
  ) : (
    <div className="routine-name">
      <h1>{routineName}</h1>
      <svg
        width="1em"
        onClick={() => editTitle()}
        height="1em"
        viewBox="0 0 16 16"
        className="bi bi-pencil text-primary"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
        />
      </svg>
    </div>
  );
  let invalid = routineName === "" ? true : false;

  // JSX RETURNED
  return(
    <div className="edit-routines-overlay">
      {RoutineName}
      <form onSubmit={(event) => editRoutine(event)} className="create-routine">
        {exercisesInputs}
        <div className="create-routine-buttons">
          <button
            className="add-exercise-button btn btn-primary"
            onClick={() => addInput()}
          >
            Add Exercise
          </button>
          <div className="submit-cancel">
            <input
              type="submit"
              value="Edit Routine"
              disabled={invalid}
              className="submit-buttons btn btn-success"
            />
            <button className="btn btn-danger" onClick = {() => handleCancel()}>Cancel</button>
          </div>
        </div>
      </form>
      
    </div>
   
  )
}

export default EditRoutines