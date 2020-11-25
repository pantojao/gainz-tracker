import React, {useState} from "react"
import axios from 'axios'
import { Link, useHistory } from "react-router-dom";

function Login(props) {
  const [username, setUserName] = useState("")
  const [password, setpassword] = useState("")
  const [serverMessage, setServerMessage] = useState(null);
  const history = useHistory();
  
  const changePassword = (event) =>{
    setpassword(event.target.value)
  }
  const changeUserName = (event) =>{
    setUserName(event.target.value)
  }

  const login = async() => {
    try {
      let serverResponse  = await axios({
        method: "post",
        data: {
          username:username, 
          password:password
        },
        withCredentials: true,
        url: "http://localhost:3001/login"
      })

      if (serverResponse.data=="Successfully Authenticated"){
        props.authenticatedUser(true)
        history.push("/routines")
      } else{
        setServerMessage(serverResponse.data)
      }
    
    } catch (error) {
      setServerMessage("Username or Password Is Incorrect")
      console.log(error)
    }
  } 

  const inputResponse = (serverMessage!==null)? <p>{serverMessage}</p>:null

  return (
    <div >
      <h1 style={{textAlign:"center"}}>Gainz Tracker</h1>
      {inputResponse}
      <div className="login-inputs">
        <input type="text" className="form-control username-input" placeholder="username" value={username} onChange = {(event) => changeUserName(event)}/>
        <input type="text" className="form-control password-input" placeholder="password" value={password} onChange = {(event) => changePassword(event)}/>
        <button className="btn btn-primary login-btn" onClick = {() => login()}>Log In</button>
        <Link style={{textAlign:"center", marginTop: "2.5em"}} to="/register">New to Gainz Tracker?</Link>
      </div>
    </div>
  )
}

export default Login