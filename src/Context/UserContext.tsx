import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};


interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
