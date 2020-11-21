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
        history.push("/routines")
      }

      setServerMessage(serverResponse.data)
    } catch (error) {
      setServerMessage("Username or Password Is Incorrect")
      throw error
    }
  } 

  const inputResponse = (serverMessage!==null)? <p>{serverMessage}</p>:null

  return (
    <div>
      <h1>Login</h1>
      {inputResponse}
      <input type="text" placeholder="username" value={username} onChange = {(event) => changeUserName(event)}/>
      <input type="text" placeholder="password" value={password} onChange = {(event) => changePassword(event)}/>
      <button onClick = {() => login()}>Submit</button>
      <Link to="/register">New to Gainz Tracker?</Link>
    </div>
  )
}

export default Login