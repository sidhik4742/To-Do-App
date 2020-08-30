import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "axios";
import "./Login.css";

function Login(props) {
  const history = useHistory();
  const setItems = props.setItems;

  // console.log(items);

  const [profilePic, setProfilePic] = useState(); //profile picture change

  const uploadImage = (event) => {
    console.log("Upload image");
    let type = event.target.files[0].type;
    if (type === "image/jpeg" || type === "image/jpg") {
      setProfilePic(URL.createObjectURL(event.target.files[0]));
    }
  };

  // const profilePicture = (event) => {
  //   console.log("profile picture clicked");
  // };

  const changeHandler = (event) => {
    props.setState({ ...props.state, [event.target.name]: event.target.value });
    // console.log(props.state.userName);
    // console.log(props.state.password);
  };

  const loginButton = async () => {
    //send user name and password  to server
    console.log("Button clicked");
    await Axios({
      method: "post",
      url: "http://localhost:3001/todoapp/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userName: props.state.userName,
        password: props.state.password,
      },
    })
      .then((response) => {
        // console.log(response.data);
        if (!response.data.auth) {
          alert(response.data.message);
        } else {
          let token = response.data.Token;
          Axios.defaults.headers.common["authorization"] = token;
          Axios({
            method: "get",
            url: "http://localhost:3001/todoapp/display",
          }).then((response) => {
            console.log("success");
            // console.log(response.data);
            const itemList = response.data;
            setItems(itemList);
            sessionStorage.setItem("itemList", JSON.stringify(itemList));
            history.push("/todoapp/main");
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login">
      <main>
        <form className="form">
          <div>
            <h1>Login Page</h1>
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
              <i className="fa fa-lock fa-2x" aria-hidden="true"></i>
            </span>
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              placeholder="Password"
            />
          </div>
          <div className="btn-div">
            <button type="button" onClick={loginButton}>
              Log In
            </button>
          </div>
        </form>
        <div className="register">
          <p>
            or <br /> New user <Link to="/todoapp/register">Register here</Link>
          </p>
        </div>
        <div className="temsService">
          <p>By Registering, | accept the</p>
          <a href="#"> Terms of Service </a> <span>and </span>
          <a href="#"> Privacy Policy</a>
        </div>
      </main>
    </div>
  );
}

export default Login;
