import React from "react";
import { render } from "react-dom";

import { Router } from "@reach/router";
import AuthContext from "./contexts/AuthContext";
import ChatPage from "./views/ChatPage";
import LandingPage from "./views/LandingPage";
import HandleLogin from "./views/HandleLogin";
import UserContext from "./contexts/UserContext";

const App = () => {
  console.log("App rendering");

  return (
    <React.StrictMode>
      <AuthContext>
        <UserContext>
          <Router>
            <LandingPage default path="/" />
            <ChatPage path="/webchat" />
            <HandleLogin path="/auth" />
          </Router>
        </UserContext>
      </AuthContext>
    </React.StrictMode>
  );
};
render(<App />, document.getElementById("root"));
