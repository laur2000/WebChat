import React, { createContext, useState } from "react";
const AuthContext = createContext();
const { Provider } = AuthContext;

const initialToken = localStorage.getItem("token");
var initialPayload = null;
if (initialToken) {
  initialPayload = decodeToken(initialToken);
}

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: initialToken ? initialToken : "",
    payload: initialPayload ? initialPayload : {},
  });

  const updateAuth = ({ token }) => {
    localStorage.setItem("token", token);
    const payload = decodeToken(token);
    setAuthState({
      token,
      payload,
    });
  };

  const isAuthenticated = () => authState.token && authState.token !== "";

  return (
    <Provider
      value={{
        authState,
        setAuthState: updateAuth,
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

function decodeToken(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

export { AuthContext, AuthProvider };
