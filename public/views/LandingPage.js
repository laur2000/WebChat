import React from "react";
import { Link } from "@reach/router";

const LandingPage = () => {
  return (
    <div className="wrapper">
      <h1>
        <Link to="/webchat">Login</Link> or Register
      </h1>
    </div>
  );
};

export default LandingPage;
