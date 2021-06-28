import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { Link } from "@reach/router";
import appImage from "../images/app_demo.PNG";

const LandingPage = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  console.log("Landing rendering");
  return (
    <div>
      <div className="jumbotron">
        <div className="row">
          <div className="col text-center">
            <h1 className="display-4">Connecting with people</h1>
            <p className="lead">
              WebChat offers a lightweight, flexible real-time chat
              implementation that can be consumed by anyone
            </p>
            <hr className="my-4" />

            <p className="d-flex justify-content-around">
              {isAuthenticated ? (
                <React.Fragment>
                  <Link className="card-link btn btn-success" to="/auth">
                    Continue to chat
                  </Link>
                  <button className="btn btn-outline-danger" onClick={logout}>
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
        <div className="row">
          <div className="col">
            <img
              style={{ minWidth: "337px" }}
              className="img-fluid mx-auto d-block"
              src={appImage}
              alt="App preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
