// UserProvider.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);  // Store user info
  const [userId, setUserId] = useState(null);      // Store the user ID
  // Function to fetch user information by userId
  const fetchUserInfo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/user/${id}`);
      setUserInfo(response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // Function to check if the token exists and is valid
 

  useEffect(() => {
    checkLoginStatus(); // Check login status on mount
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserInfo(userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userInfo,fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
