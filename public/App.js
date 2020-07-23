import React from "react";
import { render } from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Router } from "@reach/router";

import ChatPage from "./views/ChatPage";
import LandingPage from "./views/LandingPage";
import HandleLogin from "./views/HandleLogin";

const App = () => {
  //const { isAuthenticated } = useContext(AuthContext);
  return (
    <React.StrictMode>
      <Auth0Provider
        domain="chat-api.eu.auth0.com"
        clientId="zPB6eQICoSibm78onylTtjozCo4D5Iqv"
        redirectUri={window.location.origin + "/auth"}
      >
        <Router>
          <LandingPage default path="/" />
          <ChatPage path="/webchat" />
          <HandleLogin path="/auth" />
        </Router>
      </Auth0Provider>
    </React.StrictMode>
  );
};
render(<App />, document.getElementById("root"));
