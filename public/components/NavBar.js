import React from "react";
import brand_image from "../images/icon.png";

const NavBar = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "inline-flex",
        justifyContent: "center",
        boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light  justify-content-center"
        style={{ width: "60%", boxShadow: "none", marginBottom: "0px" }}
      >
        <img
          src={brand_image}
          alt="Brand"
          style={{ width: "32px", marginRight: "5px" }}
        ></img>
        <a className="navbar-brand" href="/">
          WebChat
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"></li>
          </ul>
        </div>
        <a href="/" className="btn btn-outline-secondary">
          Login
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
