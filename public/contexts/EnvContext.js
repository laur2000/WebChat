import { createContext } from "react";

export default createContext({
  AUDIENCE: "https://chat-api.eu.auth0.com/api/v2/",
  AUTH_DOMAIN: "chat-api.eu.auth0.com",
  CLIENT_ID: "zPB6eQICoSibm78onylTtjozCo4D5Iqv",
  AUTH_URI: "/auth",
  SCOPE: "read:current_user update:current_user_metadata",
});
