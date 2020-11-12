import React, { useState } from "react";
import axios from "axios";
import { Link,  useHistory } from "react-router-dom";

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
      <h1>Register</h1>
      {inputResponse}
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => changeUserName(event)}
      />

      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(event) => changePassword(event)}
      />

      <button onClick={() => register()}>Submit</button>
      
      <Link to="/">Already Have an Account?</Link>
    </div>
  );
}

export default Register;
