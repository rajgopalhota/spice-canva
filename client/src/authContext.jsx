// AuthContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "./axios";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const promise = new Promise((resolve, reject) => {
        axios
          .get("/api/fetchuser")
          .then((response) => {
            setUser(response.data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });

      toast.promise(promise, {
        loading: "Fetching user...",
        success: "User fetched successfully",
        error: "Error fetching user",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      fetchUser();
    }
  }, []);

  const loginUser = async (username, password) => {
    try {
      const promise = new Promise((resolve, reject) => {
        axios
          .post("/api/login", { username, password })
          .then((response) => {
            const token = response.data.token;
            setUser(response.data.user);
            localStorage.setItem("authToken", token);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });

      toast.promise(promise, {
        loading: "Logging in...",
        success: "Logged in successfully",
        error: (error) => error.message,
      });
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const logoutUser = async () => {
    try {
      const promise = new Promise((resolve, reject) => {
        localStorage.removeItem("authToken");
        setUser(null);
        resolve();
      });

      toast.promise(promise, {
        loading: "Logging out...",
        success: "Logged out successfully",
        error: "Error logging out",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
