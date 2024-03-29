import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const user_token = useRef("");
  const username = useRef("");
  const password = useRef("");
  const navigateAfterLogin = useNavigate();
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  const goLogin = async (username, password) => {
    const cred = `${username.current.value}:${password.current.value}`;
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
      .then((response) => {
        user_token.current = response["token"];
        props.catchUser_token(user_token.current);
        console.log(`in login.js ${user_token.current}`);
        navigateAfterLogin("/home");
      })
      .catch((error) => {
        alert("username or password is incorrect, try again!");
        console.log(JSON.stringify(error));
      });
    
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username.current.value || !password.current.value) {
      alert("Please add all info");
      return;
    }

    goLogin(username, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label>Username</label>
        <input ref={username} type="text" placeholder="Enter your username" />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          ref={password}
          type="password"
          placeholder="Enter the password"
        />
      </div>
      <input type="submit" value="Login" className="btn btn-block" />

      <div>
        <h2> Don't have an account yet? </h2>
        Register <a href="/signUp">here</a>
      </div>

      {/* <div>Rendered {renderCount.current} times</div> */}
    </form>
  );
};

export default Login;
