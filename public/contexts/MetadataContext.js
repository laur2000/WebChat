import React, { createContext, useState } from "react";
export const metadataContext = createContext([{}, () => {}]);

export default function MetadataContext(props) {
  const userHook = useState({});
  return (
    <metadataContext.Provider value={userHook}>
      {props.children}
    </metadataContext.Provider>
  );
}
