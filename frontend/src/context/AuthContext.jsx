import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";

// Create axios instance with base configuration
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// Add response interceptor for token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Check if refresh token exists in cookies before attempting refresh
        const cookies = document.cookie.split(';').map(c => c.trim());
        const hasRefreshToken = cookies.some(c => c.startsWith('refreshToken='));
        
        if (!hasRefreshToken) {
          // No refresh token available, can't proceed
          console.log("No refresh token available, user must login");
          return Promise.reject(error);
        }

        // Attempt to refresh the token
        const refreshRes = await axiosInstance.post("/users/refresh-token", {});

        // If refresh successful, retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed - user needs to login again
        console.error("Token refresh failed, please login again");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedIn = !!user;

  const fetchUser = async () => {
    try {
      setError(null);
      const res = await axiosInstance.get("/users/current-user");
      setUser(res.data.data); 
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null); // not logged in
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/users/login", credentials);
      setUser(res.data.data.user);
      setLoading(false);
      return res.data.data.user;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Login failed!";
      setError(errorMsg);
      setUser(null);
      setLoading(false);
      throw error; // Re-throw for component handling
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post("/users/logout", {});
      setUser(null);
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Logout failed!";
      setError(errorMsg);
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loggedIn, loading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
