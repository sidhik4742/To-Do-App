import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import logo from "./logo.svg";

import "./App.css";
import Main from "./Component/Main/Main";
import Footer from "./Component/Footer/Footer";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import CheckOut from "./Component/Main/CheckOut";
import Header from "./Component/Header/Header";

// export const calculateItemContext = React.createContext();

function App() {
  const [state, setState] = useState("");
  const [items, setItems] = useState();
  const [calculateItem, setCalculateItem] = useState();

  return (
    <div>
      <Router>
        <Route path="/todoapp" exact>
          <Login
            state={state}
            setState={setState}
            items={items}
            setItems={setItems}
          />
          <Footer />
        </Route>
        <Route path="/todoapp/register">
          <Register />
          <Footer />
        </Route>
        <Route path="/todoapp/main">
          <Main
            items={items}
            setItems={setItems}
            calculateItem={calculateItem}
            setCalculateItem={setCalculateItem}
          />
        </Route>
        <Route path="/todoapp/checkout">
          <Header />
          <CheckOut
            calculateItem={calculateItem}
            setCalculateItem={setCalculateItem}
          />
        </Route>
      </Router>
    </div>
  );
}

export default App;
