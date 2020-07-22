import React from "react";
//import { Router } from "@reach/router";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";

const AuthenticatedApp = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMjM1IiwiY2hhbm5lbCI6ImNoMSIsIm5hbWUiOiJKb2huIERvZSIsInJvbGVzIjpbImNoOnJlYWQiLCJjaDpjb25uZWN0Il0sImlhdCI6MTU5NTM3NzYwMCwiZXhwIjoxNTk1OTgyNDAwfQ.VtRRUZMRT3IAAUUqbrPNvFuk0jCwdhcuW0YohVsgeuI";
  const connection = JSON.parse(atob(token.split(".")[1]));
  return (
    <div className="wrapper">
      <SideBar />
      <div className="stretch-vertical d-flex flex-column " id="content">
        <Chat payload={connection} token={token} />
        <span
          style={{
            bottom: "0px",
            right: "30px",
            position: "fixed",
            textAlign: "center",
          }}
        >
          ---Frontend is in development---
        </span>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
