import React, { useContext } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { metadataContext } from "../contexts/MetadataContext";
import HandleLogin from "./HandleLogin";
import { Redirect } from "@reach/router";

export const InterceptAuth = ({ children, uri }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [metadata] = useContext(metadataContext);

  if (isLoading) {
    return <Loading />;
  }

  const isMetadataLoaded = !!metadata.userData;
  const isLoggingOut = uri === "/logout";
  const isLoggingIn = uri === "/auth"

  if (isLoggingOut) {
    return <Redirect to="/" />;
  }

  if (isLoggingIn) {
    return <HandleLogin />;
  }

  if (isAuthenticated) {
    if (isMetadataLoaded) {
      return <div>{children}</div>;
    } else {
      return <HandleLogin />;
    }
  }

  loginWithRedirect({});
  return <div></div>;
};
