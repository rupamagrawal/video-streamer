import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";

axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loggedIn = user !== null;

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/api/v1/users/current-user",
        { withCredentials: true }
      );

      setUser(res.data.data);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      credentials,
      { withCredentials: true }
    );
    setUser(res.data.data.user);
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      { withCredentials: true } // IMPORTANT
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        loading,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
