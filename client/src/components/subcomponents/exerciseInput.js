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
        <label className="sm-labels">Exercise </label>
        <input
          className="form-control"
          type="text"
          placeholder="Exercise"
          onChange={(event) => changeName(event)}
          required
          aria-required="true"
        />
        <label className="sm-labels">Sets </label>
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
        <label className="sm-labels">Reps </label>
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
        <button
          type="button"
          className="btn btn-danger"
          onClick={(event) => removeInput(event)}
        >
          remove
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default ExerciseInput;