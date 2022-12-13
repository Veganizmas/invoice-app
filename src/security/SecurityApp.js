import axios from "axios";
import React, { useState } from "react";

function SecurityApp() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
  };

  return (
    <div style={{ marginLeft: 50 }}>
      <div>
        <h1>Registration</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        ></input>
        <br></br>
        <br></br>
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        ></input>
        <br></br>
        <br></br>
        <button onClick={register}>Sign up</button>
        <hr></hr>
      </div>

      <div>
        <h1>Log In</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br></br>
        <br></br>
        <button onClick={login}>Login</button>
      </div>
      <h1>{loginStatus}</h1>
    </div>
  );
}

export default SecurityApp;
