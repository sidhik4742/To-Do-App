import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";

import "./App.css";
import Main from "./Component/Main/Main";
import Footer from "./Component/Footer/Footer";
import Login from "./Component/Login/Login";

function App() {
  return (
    <div>
      <Router>
        <Route path="/todoapp" exact component={Login}/>
        <Route path="/todoapp/main" exact component={Main}/>
      </Router>
      {/* <Login /> */}
    </div>
  );
}

export default App;
