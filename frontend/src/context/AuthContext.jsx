import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, login, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
