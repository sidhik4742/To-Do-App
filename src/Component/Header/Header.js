import React from "react";
import "./Header.css";

function Header() {
  const showMenu = () => {
      console.log("show menu");
  };
  const creatItem = () => {
      console.log("creat item");
  };
  return (
    <div className="header">
      <div className="navicon">
        <i
          className="fa fa-bars fa-2x"
          aria-hidden="true"
          onClick={showMenu}
        ></i>
      </div>
      <div className="creatItem">
        <i
          className="fa fa-plus-circle fa-3x"
          aria-hidden="true"
          onClick={creatItem}
        ></i>
      </div>
      <div className="menu">
        <div className="headerName">
          <h1>Name</h1>
        </div>
        <div className="menuList">
          <li>option</li>
          <li>option</li>
          <li>option</li>
        </div>
      </div>
    </div>
  );
}

export default Header;
