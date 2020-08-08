import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Register.css";
import Axios from "axios";

function Register() {
  const history = useHistory();
  const [registerUser, setRegisterUser] = useState({
    userName: "",
    emailOrPhone: "",
    password: "",
    Cpassword: "",
  });
  //   console.log(registerUser);
  const changeHandler = (event) => {
    setRegisterUser({
      ...registerUser,
      [event.target.name]: event.target.value,
    });
  };
  const submitButton = (event) => {
    event.preventDefault();
    if (
      registerUser.password === registerUser.Cpassword &&
      registerUser.password !== "" &&
      registerUser.emailOrPhone !== ""
    ) {
      console.log("form submitting...");
      Axios({
        method: "post",
        url: "http://localhost:3001/todoapp/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: registerUser,
      })
        .then((response) => {
          // console.log(response.data);
          alert(response.data);
          history.push("/todoapp");
        })
        .catch((error) => {
          // console.error(`Error :${error}`);//
        });
    } else {
      alert("Please fill the form");
    }
  };

  return (
    <div className="registerComponent">
      <main>
        <form className="registerForm" onSubmit={submitButton}>
          <div>
            <h1>Register Page</h1>
          </div>
          <div>
            <span>
              <i className="fa fa-user fa-2x" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              name="userName"
              onChange={changeHandler}
              placeholder="User name"
            />
          </div>
          <div>
            <span>
              <i className="fa fa-id-badge fa-2x" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              name="emailOrPhone"
              onChange={changeHandler}
              placeholder="Email/phone"
            />
          </div>
          <div>
            <span>
              <i className="fa fa-lock fa-2x" aria-hidden="true"></i>
            </span>
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              placeholder="Password"
            />
          </div>
          <div>
            <span>
              <i className="fa fa-lock fa-2x" aria-hidden="true"></i>
            </span>
            <input
              type="password"
              name="Cpassword"
              onChange={changeHandler}
              placeholder="Confirm password"
            />
          </div>
          <div className="btn-div">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Register;
