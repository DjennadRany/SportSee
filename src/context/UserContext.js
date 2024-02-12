import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserContextProvider = ({ children, userId }) => {
  const [userData, setUserData] = useState({
    user: null,
    activity: [],
    averageSessions: null,
    performance: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async (userId) => {
    setLoading(true);
    try {
      const userResponse = await axios.get(`http://localhost:3000/user/${userId}`);
      const activityResponse = await axios.get(`http://localhost:3000/user/${userId}/activity`);
      const averageSessionsResponse = await axios.get(`http://localhost:3000/user/${userId}/average-sessions`);
      const performanceResponse = await axios.get(`http://localhost:3000/user/${userId}/performance`);

      setUserData({
        user: userResponse.data.data.userInfos,
        activity: activityResponse.data.data.sessions,
        averageSessions: averageSessionsResponse.data.data.sessions,
        performance: performanceResponse.data.data,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setLoading(false);
  }, []); // Les dépendances vides signifient que cette fonction ne sera recréée que si le composant est remonté

  useEffect(() => {
    if (userId && !loading) {
      fetchUserData(userId);
    }
  }, [userId, loading, fetchUserData]);

  const contextValue = {
    userData,
    loading,
    fetchUserData,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);