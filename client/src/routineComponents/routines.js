import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EditRoutine from './editRoutine'
import Dropdown from "react-bootstrap/Dropdown";
import PlusIcon from "../components/icons/plus"
const axios = require("axios");

function Routines(props) {
  const [userRoutines, setUserRoutines] = useState(null);
  const [editRoutine, setEditRoutine] = useState(null)
  const history = useHistory()

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
        width="1.3em"
        height="1.4em"
        viewBox="0 0 16 16"
        className="bi bi-three-dots-vertical"
        fill="rgb(255,223,0)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
        />
      </svg>
    </a>
  ));
  
  const removeRoutine = async (key) => {
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

  const changeRoutine = (key) => setEditRoutine(key);

  const callBackFunction = (childData) => {
    if (childData === "done") setEditRoutine(null)
  }

  useEffect(async () => {
    let serverResponse = await axios.get("get-routines");
    setUserRoutines(serverResponse.data);
    console.log(serverResponse.data)
  }, []);

  const startRoutine = (id) => {
    history.push(`/session/${id}`)
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
            <h2 className="light-text">{routine.routineName.split("+").join(" ")}</h2>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
              <Dropdown.Menu size="lg" title="">
                <Dropdown.Item onClick={() => startRoutine(routine._id)}>Start Routine</Dropdown.Item>
                <Dropdown.Item onClick={() => changeRoutine(routine._id)}>Edit Routine</Dropdown.Item>
                <Dropdown.Item onClick={() => removeRoutine(routine._id)}>Delete Routine</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <p className="light-text">{exercises}</p>
        </div>
      );
    });
  }


    if(editRoutine!==null) return <EditRoutine routines={userRoutines} routineKey={editRoutine} parentCallBack={callBackFunction}/>

    
    return(

    <div className="routines">
      <div className="all-routines-header">
        <h2 className="routines-header-title">Your Routines</h2>
        <PlusIcon />
      </div>
      <div className="your-routines">{userCards}</div>

      <h2 className="default-routines-header">Default Routines</h2>
      <div className="default-routines">
        <div className="default-card">
          <h2 className="light-text">Push</h2>
          <p className="light-text">Bench Press, Dips, Overhead Press, Chest Flys, Tricep Extension</p>
        </div>
        <div className="default-card">
          <h2 className="light-text">Pull</h2>
          <p className="light-text">Pull Ups, Lat Pulldowns, Curls, Rows</p>
        </div>
        <div className="default-card">
          <h2 className="light-text">Legs</h2>
          <p className="light-text">Squats, Calve Raises, Leg Curls, Lunges, Hamstring Curls</p>
        </div>
      </div>
    </div>
    )

    
    
}

export default Routines;
