import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { navigate } from "@reach/router";
import Loading from "../components/Loading";

const HandleLogin = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  if (!isLoading) {
    if (isAuthenticated) {
      getAccessTokenSilently({
        audience: process.env.AUDIENCE,
        scope: ["channel:read", "channel:connect"],
      })
        .then(console.log)
        .catch(console.error);
      navigate("/webchat");
    } else {
      navigate("/");
    }
  }
  return <Loading />;
};

export default HandleLogin;
