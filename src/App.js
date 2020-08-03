import React,{useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";

import "./App.css";
import Main from "./Component/Main/Main";
import Footer from "./Component/Footer/Footer";
import Login from "./Component/Login/Login";

function App() {
  const [state, setState] = useState("");
  const [items, setItems] = useState();
  return (
    <div>
      <Router>
        <Route path="/todoapp" exact>
          <Login state={state} setState={setState} items={items} setItems={setItems} />
        </Route>
        <Route path="/todoapp/main" >
          <Main items={items} setItems={setItems} />
        </Route>
      </Router>
      {/* <Login /> */}
    </div>
  );
}

export default App;
