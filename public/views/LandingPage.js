import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { Link } from "@reach/router";
const LandingPage = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="wrapper flex-column text-center">
      <h1>Landing page is coming soon</h1>
      <div
        className="card mx-auto"
        style={{ maxWidth: "400px", minWidth: "300px" }}
      >
        {isAuthenticated ? (
          <React.Fragment>
            <Link className="card-link btn btn-success" to="/webchat">
              Continue to chat
            </Link>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </React.Fragment>
        ) : (
          <button className="btn" onClick={loginWithRedirect}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
