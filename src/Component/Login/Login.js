import React, { Component } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./Login.css";

class Login extends Component {
  state = {
    dp: "",
    userName: "",
    password: "",
  };

  uploadImage = (event) => {
    console.log("Upload image");
    let type = event.target.files[0].type;
    if (type == "image/jpeg" || type == "image/jpg") {
      console.log(event.target.files[0]);
      this.setState({
        dp: URL.createObjectURL(event.target.files[0]),
      });
      console.log(this.state.dp);
    }
  };

  profilePicture = (event) => {
    console.log("profile picture clicked");
  };

  changeHandler = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        console.log(this.state.userName);
      }
    );
  };

  loginButton = () => {
    console.log("Button clicked");
    axios({
      method: "post",
      url: "http://localhost:3001/todoapp/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userName: this.state.userName,
        password: this.state.password,
        Token: "123",
      },
    })
      .then((response) => {
        this.setState({
          userName: "",
          password: "",
        });
        console.log(response.data);
        if(response.data.Token === "123"){
          this.props.history.push("/todoapp/main")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="login">
        <main>
          <form className="form">
            <div className="img-div">
              <label htmlFor="uploadImage">
                <img
                  className="image"
                  onClick={this.profilePicture}
                  src={
                    this.state.dp
                      ? this.state.dp
                      : "https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg"
                  }
                  alt=""
                />
              </label>
              <input
                type="file"
                id="uploadImage"
                onChange={this.uploadImage}
                style={{ display: "none" }}
              />
            </div>
            <div>
              <span>
                <i className="fa fa-user fa-2x" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                name="userName"
                onChange={this.changeHandler}
                value={this.state.userName}
                placeholder="user name"
              />
            </div>
            <div>
              <span>
                <i className="fa fa-lock fa-2x" aria-hidden="true"></i>
              </span>
              <input
                type="password"
                name="password"
                onChange={this.changeHandler}
                value={this.state.password}
                placeholder="password"
              />
            </div>
            <div className="btn-div">
              <button type="button" onClick={this.loginButton}>
                Log In
              </button>
            </div>
          </form>
          <div className="temsService">
            <p>By Registering, | accept the</p>
            <a href="#"> Terms of Service </a> <span>and </span>
            <a href="#"> Privacy Policy</a>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
