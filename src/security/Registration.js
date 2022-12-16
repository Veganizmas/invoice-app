import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

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

  return (
    <div className="container">
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
    </div>
  );
}

export default Registration;
