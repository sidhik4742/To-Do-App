import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <footer>
        <p>
          © 2020 Login Form . All Rights Reserved | App by
          <a href="https://personal-websiteserver.herokuapp.com/">
            {" "}
            S@R Creation
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
