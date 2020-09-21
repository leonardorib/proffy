import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from 'react';

import api from '../services/api';

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  is_teacher: boolean;
  avatar_url: string;
}

interface UserContextData {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const getUserData = useCallback(async () => {
    const token = localStorage.getItem('proffy-token');

    const response = await api.get<UserData>('users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUserData((response.data as unknown) as UserData);

    return (response.data as unknown) as UserData;
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const [userData, setUserData] = useState<UserData>({} as UserData);

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
