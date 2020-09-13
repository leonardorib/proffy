import React, { useState, createContext, useContext } from 'react';

import jwt from 'jsonwebtoken';

interface UserData {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  is_teacher: string;
  email: number;
}

interface UserContextData {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const token = localStorage.getItem('proffy-token');

    if (token) {
      const decodedToken = jwt.decode(token);

      const {
        id,
        name,
        first_name,
        last_name,
        is_teacher,
        email,
      }: any = decodedToken;
      return { id, name, first_name, last_name, is_teacher, email } as UserData;
    }

    return {} as UserData;
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
}
