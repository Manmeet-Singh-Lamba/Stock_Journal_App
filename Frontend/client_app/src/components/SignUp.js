import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  //const [user_token, setUser_token] = useState("");
  const user_token = useRef("");
  const username = useRef("");
  const password = useRef("");
  const email = useRef("");
  const confirmPassword = useRef("");
  const navigateAfterSignUp = useNavigate();
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  const goSignUp = async (username, password, email) => {
    // const cred = `${username.current.value}:${password.current.value}`;
    // const info = btoa(cred);
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Basic ${info}`);

    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };

    // fetch("http://127.0.0.1:5000/user", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     user_token.current = result["token"];
    //     sessionStorage.setItem("user_token", result["token"]);
    //   })
    //   .catch((error) => console.log("error:", error));

    // console.log(`in SignUp.js ${user_token.current}`);
    // props.catchUser_token(user_token.current);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/user", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    navigateAfterSignUp("/login");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !username.current.value ||
      !password.current.value ||
      !email.current.value
    ) {
      alert("Please add all info");
      return;
    }
    if (password.current.value != confirmPassword.current.value) {
      alert(
        'Please confirm the password by typing the password again in "Confirm password" field'
      );
      return;
    }

    goSignUp(username, password, email);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label>Username</label>
        <input ref={username} type="text" placeholder="Enter a username" />
      </div>
      <div className="form-control">
        <label>Email</label>
        <input ref={email} type="email" placeholder="Enter the email" />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          ref={password}
          type="password"
          placeholder="Enter the password"
        />
      </div>
      <div className="form-control">
        <label>Confirm Password</label>
        <input
          ref={confirmPassword}
          type="password"
          placeholder="Enter the password again"
        />
      </div>

      <input type="submit" value="SignUp" className="btn btn-block" />

      <div>
        <h2> Already have an account? </h2>
        Login <a href="/login">here</a>
      </div>

      {/* <div>Rendered {renderCount.current} times</div> */}
    </form>
  );
};

export default SignUp;
