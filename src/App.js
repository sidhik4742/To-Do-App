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
import SaveList from "./Component/Main/SaveList";

// export const calculateItemContext = React.createContext();

function App() {
  const [state, setState] = useState("");
  const [items, setItems] = useState();
  const [copyItems, setCopyItems] = useState();
  const [calculateItem, setCalculateItem] = useState();
  const [profilePic, setProfilePic] = useState();

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
          <Register profilePic={profilePic} setProfilePic={setProfilePic} />
          <Footer />
        </Route>
        <Route path="/todoapp/main">
          <Header
            items={items}
            setItems={setItems}
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
          <Main
            items={items}
            setItems={setItems}
            copyItems={copyItems}
            setCopyItems={setCopyItems}
            calculateItem={calculateItem}
            setCalculateItem={setCalculateItem}
          />
        </Route>
        <Route path="/todoapp/checkout">
          <Header profilePic={profilePic} setProfilePic={setProfilePic} />
          <CheckOut
            calculateItem={calculateItem}
            setCalculateItem={setCalculateItem}
            setItems={setItems}
          />
        </Route>
        <Route path="/todoapp/savedlist">
          <Header />
          <SaveList />
        </Route>
      </Router>
    </div>
  );
}

export default App;
