import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axiosInstance from '../api';
import { User } from '../types/user';



export interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};



export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await axiosInstance.get('/user-info/', {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
