import React, { useState, createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: undefined,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [isLoggedIn, setAuth] = useState(undefined);
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
    isLoggedIn,
    registerUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
