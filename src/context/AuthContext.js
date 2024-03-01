import React, { useState, createContext } from "react";

export const AuthContext = createContext({
  auths: undefined,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [auths, setAuth] = useState(undefined);
  const [registerUser, setRegisterUser] = useState([]);

  const login = (userData) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth(undefined);
  };
  const register = (userData) => {
    setRegisterUser(userData);
  };
  const valueContext = {
    auths,
    registerUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
