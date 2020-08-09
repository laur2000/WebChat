import React, { useContext } from "react";
import { metadataContext } from "../contexts/MetadataContext";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";

const ChatPage = () => {
  const [metadata] = useContext(metadataContext);
  const username = metadata.userData.username;
  const token = metadata.appData.global_token;
  const connection = JSON.parse(atob(token.split(".")[1]));
  console.log("ChatPage rendering");
  return (
    <div className="wrapper">
      <SideBar username={username} />
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
