import React, { useState } from "react";
import "./Header.css";
import ItemCreating from "../Main/ItemCreating";
import Navbar from "./Navbar";

function Header(props) {
  // console.log(props);
  const items = props.items;
  const setItems = props.setItems;
  const [showHideCreateItem, setShowHideCreateItem] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const navbarOpen = () => {
    console.log("show menu");
    setNavbar(true);
  };
  const creatItem = () => {
    console.log("creat item");
    setShowHideCreateItem(true);
  };
  return (
    <div>
      <div>{navbar && <Navbar setNavbar={setNavbar} />}</div>
      <div>
        {showHideCreateItem && (
          <ItemCreating
            setShowHideCreateItem={setShowHideCreateItem}
            setItems={setItems}
            items={items}
          />
        )}
      </div>
      <div className="header">
        <div className="navicon">
          <i
            className="fa fa-bars fa-2x"
            aria-hidden="true"
            onClick={navbarOpen}
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
