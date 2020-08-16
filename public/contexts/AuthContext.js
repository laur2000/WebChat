import React, { useContext } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import EnvContext from "./EnvContext";

export default function AuthContext({ children }) {
  const env = useContext(EnvContext);

  console.log("Rendering auth context");
  return (
    <Auth0Provider
      domain={env.AUTH_DOMAIN}
      clientId={env.CLIENT_ID}
      redirectUri={window.location.origin + env.AUTH_URI}
      scope={env.SCOPE}
    >
      {children}
    </Auth0Provider>
  );
}
