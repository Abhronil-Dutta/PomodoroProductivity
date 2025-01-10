import React, { createContext, useContext, useState, useEffect } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [settings, setSettings] = useState({
        workMinutes: 25,
        workSeconds: 0,
        shortRestMinutes: 5,
        shortRestSeconds: 0,
        longRestMinutes: 15,
        longRestSeconds: 0,
        darkMode: false,
      });

  
      return (
        <UserContext.Provider value={{ userId, setUserId, settings, setSettings }}>
          {children}
        </UserContext.Provider>
      );
  };

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
