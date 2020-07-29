import React, { useState } from "react";
require("dotenv").config();
import { render } from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Router } from "@reach/router";

import ChatPage from "./views/ChatPage";
import LandingPage from "./views/LandingPage";
import HandleLogin from "./views/HandleLogin";

const App = () => {
  //const { isAuthenticated } = useContext(AuthContext);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMjM1IiwiY2hhbm5lbCI6ImNoMCIsIm5hbWUiOiJKb2huIERvZSIsInBlcm1pc3Npb25zIjpbImNoYW5uZWw6cmVhZCIsImNoYXQ6d3JpdGUiXSwiaWF0IjoxNTk1OTgxNzkzLCJleHAiOjE1OTY1ODY1OTN9.ueAjQ6wJ5d5V24bQTQqwtlybLoJ4_SNW63rdV7R3ANI"
  );
  return (
    <React.StrictMode>
      <Auth0Provider
        domain="chat-api.eu.auth0.com"
        clientId="zPB6eQICoSibm78onylTtjozCo4D5Iqv"
        redirectUri={window.location.origin + "/auth"}
      >
        <Router>
          <LandingPage default path="/" />
          <ChatPage token={token} path="/webchat" />
          <HandleLogin path="/auth" />
        </Router>
      </Auth0Provider>
    </React.StrictMode>
  );
};
render(<App />, document.getElementById("root"));
