import React, {useState, useEffect, Fragment} from 'react'

function ExerciseCard(props) {
    return (
      <div className="exerciseCard">
      <h2>{props.exercise}</h2>
        <div className="routine-column-names">
          <div className="set-column">
            <h3>Set</h3>
            <p>1</p>
            <p>2</p>
            <p>3</p>
          </div>

          <div className="prev-column">
            <h3>Prev</h3>
            <p>{props.prev}</p>
            <p>{props.prev}</p>
            <p>{props.prev}</p>
          </div>

          <div className="weight-column">
            <h3>Weight</h3>
            <p>5</p>
            <p>5</p>
            <p>5</p>
          </div>

          <div className="reps-columns">
            <h3>Reps</h3>
            <p>3</p>
            <p>3</p>
            <p>3</p>
          </div>
        </div>
      </div>
    )
}

export default ExerciseCard