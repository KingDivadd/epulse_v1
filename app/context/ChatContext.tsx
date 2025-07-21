'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
    header_nav: string; 
    setHeader_nav: (header_nav: string) => void;
    user_information: UserInfoProps | null;
    setUser_information: (user_information: UserInfoProps | null) => void;
    country_dial_code: string;
    setCountry_dial_code: (country_dial_code: string) => void;
}


// Provide a default value matching the shape of ChatContextType
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [header_nav, setHeader_nav] = useState('home');
    const [user_information, setUser_information] = useState<UserInfoProps | null>(null);
    const [country_dial_code, setCountry_dial_code] = useState('+234');

    return (
        <ChatContext.Provider value={{
            header_nav, setHeader_nav,
            user_information, setUser_information,
            country_dial_code, setCountry_dial_code
            
            }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
