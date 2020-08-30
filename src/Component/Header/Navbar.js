import React from "react";
import { useHistory } from "react-router";
import "./Navbar.css";
import personIcon from "../../images/person.png";
import { Link } from "react-router-dom";

function Navbar(props) {
  const history = useHistory();
  const setNavbar = props.setNavbar;
  const profilePic = props.profilePic;
  const setProfilePic = props.setProfilePic;

  const logOutAction = () => {
    history.push("/todoapp");
  };

  const uploadImage = (event) => {
    console.log("Upload image");
    let type = event.target.files[0].type;
    if (type === "image/jpeg" || type === "image/jpg") {
      setProfilePic(URL.createObjectURL(event.target.files[0]));
    }
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
      <div className="img-div">
        <label htmlFor="uploadImage">
          <img
            className="image"
            // onClick={profilePicture}
            src={profilePic ? profilePic : personIcon}
            alt=""
          />
        </label>
        <input
          type="file"
          id="uploadImage"
          onChange={uploadImage}
          style={{ display: "none" }}
        />
      </div>
      <div className="menulist">
        <ul>
          <li>
            <Link to="/todoapp/savedlist">Saved List</Link>
          </li>
          <li onClick={logOutAction}>LogOut</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
