import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";
const LandingPage = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  return isLoading ? (
    <Loading />
  ) : (
    <div className="wrapper flex-column">
      <h1>Landing page is coming soon</h1>
      {!isAuthenticated ? (
        <button className="btn" onClick={loginWithRedirect}>
          Login
        </button>
      ) : (
        <button className="btn" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default LandingPage;
