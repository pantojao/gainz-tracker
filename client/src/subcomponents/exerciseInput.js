import React, { useState, useEffect } from "react";

function ExerciseInput(props) {
  const [exerciseName, setExerciseName] = useState(undefined);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(8);
  const [deleteSelf, setDelete] = useState(false);

  useEffect(() => {
    let id = deleteSelf ? "delete" : props.id;
    props.parentCallBack({
      id: id,
      exerciseName: exerciseName,
      sets: sets,
      reps: reps,
    });
  }, [exerciseName, sets, reps, deleteSelf]);

  const changeName = (event) => setExerciseName(event.target.value);
  const changeSets = (event) => setSets(event.target.value);
  const changeReps = (event) => setReps(event.target.value);
  const removeInput = () => setDelete(!deleteSelf);

  if (deleteSelf === false) {
    return (
      <div id={props.id} className="new-exercise-inputs">
        {/* <label className="sm-labels">Exercise </label> */}
        <input
          className="form-control exercise-inputs"
          type="text"
          placeholder="Exercise"
          onChange={(event) => changeName(event)}
          required
          aria-required="true"
        />
        <div className="number-input-div">
          <label className="sm-labels">Sets</label>
          <input
            className="form-control number-input"
            type="number"
            min="1"
            value={sets}
            placeholder="1"
            onChange={(event) => changeSets(event)}
            required
            aria-required="true"
          />

          <label className="sm-labels">Reps</label>
          <input
            className="form-control number-input"
            type="number"
            min="1"
            value={reps}
            placeholder="1"
            onChange={(event) => changeReps(event)}
            required
            aria-required="true"
          />
        </div>
        <svg onClick={(event) => removeInput(event)} width="4em" height="2em" viewBox="0 0 16 16" className="bi bi-trash-fill text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
        </svg>
  
      </div>
    );
  } else {
    return null;
  }
}

export default ExerciseInput;