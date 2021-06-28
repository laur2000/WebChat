import React from "react";
import { render } from "react-dom";

import { Router } from "@reach/router";
import AuthContext from "./contexts/AuthContext";
import ChatPage from "./views/ChatPage";
import LandingPage from "./views/LandingPage";
import UserContext from "./contexts/MetadataContext";
import "@babel/polyfill";
import "antd/dist/antd.css";
import { InterceptAuth } from "./views/InterceptAuth";

const App = () => {
  console.log("App rendering");

  return (
    <React.StrictMode>
      <AuthContext>
        <UserContext>
          <Router>
            <LandingPage path="/" />
            
            <InterceptAuth default>
              <ChatPage path="/webchat" />
            </InterceptAuth>
          </Router>
        </UserContext>
      </AuthContext>
    </React.StrictMode>
  );
};
render(<App />, document.getElementById("root"));
