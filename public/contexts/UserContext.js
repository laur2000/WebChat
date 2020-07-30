import React, { createContext, useState } from "react";
export const userContext = createContext([{}, () => {}]);

export default function UserContext(props) {
  const userHook = useState({});
  return (
    <userContext.Provider value={userHook}>
      {props.children}
    </userContext.Provider>
  );
}
