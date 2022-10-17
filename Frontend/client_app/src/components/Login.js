import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_token, setUser_token] = useState("");
  const navigateAfterLogin = useNavigate();

  const goLogin = async (username, password) => {
    const cred = `${username}:${password}`;
    const info = btoa(cred);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${info}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUser_token(result["token"]);
        sessionStorage.setItem("user_token", result["token"]);
      })
      .catch((error) => console.log("error", error));

    console.log(`in login.js ${user_token}`);
    props.catchUser_token(user_token);
    navigateAfterLogin("/home");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please add all info");
      return;
    }

    goLogin(username, password);

    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter the password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Login" className="btn btn-block" />
    </form>
  );
};

export default Login;
