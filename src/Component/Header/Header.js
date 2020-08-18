import React, { useState, useEffect } from "react";
import "./Header.css";
import ItemCreating from "../Main/ItemCreating";

function Header() {
  const [showHideCreateItem, setShowHideCreateItem] = useState(false);
  const showMenu = () => {
    console.log("show menu");
  };
  const creatItem = () => {
    console.log("creat item");
    setShowHideCreateItem(true);
  };
  return (
    <div>
      <div>
        {showHideCreateItem && (
          <ItemCreating setShowHideCreateItem={setShowHideCreateItem} />
        )}
      </div>
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
    </div>
  );
}

export default Header;
