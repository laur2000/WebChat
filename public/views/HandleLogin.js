import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { navigate } from "@reach/router";
import Loading from "../components/Loading";
const HandleLogin = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  if (!isLoading) {
    if (isAuthenticated) {
      navigate("/webchat");
    } else {
      navigate("/");
    }
  }
  return <Loading />;
};

export default HandleLogin;
