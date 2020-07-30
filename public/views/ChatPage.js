import React, { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";

const ChatPage = () => {
  const [userInfo] = useContext(userContext);
  const token = userInfo.global_token;
  const connection = JSON.parse(atob(token.split(".")[1]));
  console.log("ChatPage rendering");
  return (
    <div className="wrapper">
      <SideBar username={userInfo.username} />
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

export default ChatPage;
