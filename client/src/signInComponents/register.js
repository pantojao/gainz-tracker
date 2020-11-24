import React, { useState } from "react";
import { Link,  useHistory } from "react-router-dom";
import axios from "axios";


function Register() {
  const [username, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();

  const changePassword = (event) => {setpassword(event.target.value);};
  const changeUserName = (event) => {setUserName(event.target.value)};

  const register = async () => {
    try {
      const serverResponse = await axios({
        method: "post",
        data: {
          username: username,
          password: password,
        },
        withCredentials: true,
        url: "http://localhost:3001/register",
      });

      if (serverResponse.data==="User Created"){history.push("/");}
      setServerMessage(serverResponse.data);

    } catch (error) {
      console.log(error);
    }
  };

  const inputResponse =
    serverMessage === "Username Taken" ? <p>username is taken</p> : null;

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Gainz Tracker</h1>
      <p style={{textAlign:"center", marginTop: "1.5em"}} >Create Your Account</p>
      {inputResponse}
      <div className="login-inputs">
        <input
          type="text"
          className="form-control username-input"
          placeholder="username"
          value={username}
          onChange={(event) => changeUserName(event)}
        />

        <input
          type="text"
          placeholder="password"
          className="form-control password-input"
          value={password}
          onChange={(event) => changePassword(event)}
        />
        <button className="btn btn-primary login-btn" onClick={() => register()}>Register</button>
      
        <Link style={{textAlign:"center", marginTop: "2.5em"}} to="/">Already Have an Account?</Link>
      </div>
    </div>
  );
}

export default Register;
