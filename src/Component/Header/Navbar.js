import React from "react";
import { useHistory } from "react-router";
import "./Navbar.css";

function Navbar(props) {
  const history = useHistory();
  const setNavbar = props.setNavbar;
  const logOutAction = () => {
    history.push("/todoapp");
  };
  const navbarColse = () => {
    setNavbar(false);
  };
  return (
    <div className="navbar">
      <div className="navbarClose">
        <i
          className="fa fa-times fa-2x"
          aria-hidden="true"
          onClick={navbarColse}
        ></i>
      </div>
      <div className="menulist">
        <ul>
          <li onClick={logOutAction}>LogOut</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
