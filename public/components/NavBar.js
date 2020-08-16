import React from "react";

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
          src="icon.eebb0f3a.png"
          alt="Brand"
          style={{ width: "32px", marginRight: "5px" }}
        ></img>
        <a className="navbar-brand" href="/">
          WebChat
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
