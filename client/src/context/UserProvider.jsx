import { createContext, useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode'; // Fix import here

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); 
  const [userId, setUserId] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')); 
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId); // Fix here, decode the token to get the userId
        const response = await axios.get(`http://localhost:5000/api/auth/user/${decodedToken.userId}`);
        setUserInfo(response.data);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // Fetch user info when the component is mounted
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
