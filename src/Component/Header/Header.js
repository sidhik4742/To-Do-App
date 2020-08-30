import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Header.css";
import ItemCreating from "../Main/ItemCreating";
import Navbar from "./Navbar";

function Header(props) {
  // console.log(props);
  const history = useHistory();
  const items = props.items;
  const setItems = props.setItems;
  const [showHideCreateItem, setShowHideCreateItem] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const logOutAction = () => {
    history.push("/todoapp");
  };
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
      <div>
        {navbar && (
          <Navbar
            setNavbar={setNavbar}
            profilePic={props.profilePic}
            setProfilePic={props.setProfilePic}
          />
        )}
      </div>
      <div>
        {showHideCreateItem && (
          <ItemCreating
            setShowHideCreateItem={setShowHideCreateItem}
            setItems={setItems}
            items={items}
            setCopyItems={props.setCopyItems}
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
            <li onClick={logOutAction}>Log Out</li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
