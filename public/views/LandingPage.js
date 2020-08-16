import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { Link } from "@reach/router";
import NavBar from "../components/NavBar";
const LandingPage = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  console.log("Landing rendering");
  return (
    <div>
      <NavBar />

      <div className="jumbotron">
        <div>
          <h1 className="display-4">Connecting with people</h1>
          <p className="lead">
            WebChat offers a lightweight, flexible real-time chat implementation
            that can be consumed by anyone
          </p>
          <hr className="my-4" />

          <p className="lead">
            {isAuthenticated ? (
              <React.Fragment>
                <Link className="card-link btn btn-success" to="/auth">
                  Continue to chat
                </Link>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </React.Fragment>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => loginWithRedirect({})}
              >
                Sign Up
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
