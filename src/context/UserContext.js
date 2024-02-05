import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({ userInfos, keyData, children }) => {
  const contextValue = {
    userInfos: userInfos || {},
    keyData: keyData || {},
  };



  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
