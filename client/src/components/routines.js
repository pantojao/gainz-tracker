import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

function Routines(props) {
  const [userRoutines, setUserRoutines] = useState(null);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-three-dots-vertical"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
        />
      </svg>
    </a>
  ));

  useEffect(async () => {
    let serverResponse = await axios.get("get-routines");
    setUserRoutines(serverResponse.data);
  }, []);

  let removeRoutine = async (key) => {
    let newUserRoutine = userRoutines.filter(routines => {
      return routines._id !==key
    })
    setUserRoutines(newUserRoutine)

    try {
      const config = {
        headers: {
          "Content-Type": "application/JSON",
        },
      };
      await axios.post("/remove-routine", newUserRoutine, config);

    } catch (error) {
      console.log(error);
    }
  }

  let userCards = [];
  if (userRoutines !== null) {
    userRoutines.forEach((routine) => {
      let exercises = [];

      routine.exercises.forEach((exercise) => {
        exercises.push(exercise.exerciseName + ", ");
      });
      exercises[exercises.length - 1] = exercises[exercises.length - 1].replace(
        /,\s*$/,
        ""
      );
      userCards.push(
        <div className="your-routine" key={routine._id}>
          <div className="routine-card-header">
            <h2>{routine.routineName.split("+").join(" ")}</h2>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
              <Dropdown.Menu size="sm" title="">
                <Dropdown.Item>Start Routine</Dropdown.Item>
                <Dropdown.Item>Edit Routine</Dropdown.Item>
                <Dropdown.Item onClick={() => removeRoutine(routine._id)}>Delete Routine</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <p>{exercises}</p>
        </div>
      );
    });
  }

  return (
    <div className="routines">
      <button className="btn btn-dark create-routine-btn">
        <Link to="/new-routine">Create Routine</Link>
      </button>
      <h2 className="your-routines-header">Your Routines</h2>
      <div className="your-routines">{userCards}</div>

      <h2 className="default-routines-header">Default Routines</h2>
      <div className="default-routines">
        <div className="default-card">
          <h2>Push</h2>
          <p>Bench Press, Dips, Overhead Press, Chest Flys, Tricep Extension</p>
        </div>
        <div className="default-card">
          <h2>Pull</h2>
          <p>Pull Ups, Lat Pulldowns, Curls, Rows</p>
        </div>
        <div className="default-card">
          <h2>Legs</h2>
          <p>Squats, Calve Raises, Leg Curls, Lunges, Hamstring Curls</p>
        </div>
      </div>
    </div>
  );
}

export default Routines;
