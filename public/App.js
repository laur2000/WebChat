import React from "react";
import { render } from "react-dom";
import AuthenticatedApp from "./views/AuthenticatedApp";
import UnauthenticatedApp from "./views/UnauthanticatedApp";
//import { Router } from "@reach/router";

const authenticated = true;
const App = () => {
  return (
    <React.StrictMode>
      {authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.StrictMode>
  );
};
render(<App />, document.getElementById("root"));
