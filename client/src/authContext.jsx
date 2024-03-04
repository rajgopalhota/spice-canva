import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "./axios";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/fetchuser");
      setUser(response.data);
      toast.success("User fetched successfully");
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Error fetching user");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      fetchUser();
    }
  }, []);

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post("/login", { username, password });
      const token = response.data.token;
      setUser(response.data.user);
      localStorage.setItem("authToken", token);
      axios.defaults.headers.common["Authorization"] = token; // Set Axios authorization header
      toast.success("Logged in successfully");
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error(error.response?.data?.message || "Error logging in");
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      localStorage.removeItem("authToken");
      setUser(null);
      delete axios.defaults.headers.common["Authorization"]; // Remove Axios authorization header
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
