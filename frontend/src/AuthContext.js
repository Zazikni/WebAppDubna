import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');
    if (storedToken) {
      setAccessToken(storedToken);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const login = (token, loginUsername) => {
    setAccessToken(token);
    setUsername(loginUsername);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('username', loginUsername);
  };

  const logout = () => {
    setAccessToken(null);
    setUsername(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
  };

  const value = {
    accessToken,
    username,
    isAuthenticated: !!accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
