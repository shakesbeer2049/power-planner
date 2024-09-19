import axios from "axios";
import { useState, createContext, useEffect } from "react";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "https://power-planner-fe-rpuw.onrender.com";
  };

  return (
    <AuthContext.Provider value={{ userDetails, setUserDetails, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
