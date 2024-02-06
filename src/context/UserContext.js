import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    user: null,
    activity: [],
    averageSessions: null,
    performance: null,
  });

  const fetchUserData = async (userId) => {
    try {
      const userResponse = await axios.get(`http://localhost:3000/user/${userId}`);
      const activityResponse = await axios.get(`http://localhost:3000/user/${userId}/activity`);
      const averageSessionsResponse = await axios.get(`http://localhost:3000/user/${userId}/average-sessions`);
      const performanceResponse = await axios.get(`http://localhost:3000/user/${userId}/performance`);

      setUserData({
        user: userResponse.data,
        activity: activityResponse.data.data.sessions,
        averageSessions: averageSessionsResponse.data.data,
        performance: performanceResponse.data,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Propagez l'erreur pour la gérer dans le composant utilisateur
    }
  };

  const contextValue = {
    userData,
    fetchUserData,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
