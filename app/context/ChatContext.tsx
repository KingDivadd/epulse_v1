'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserInfoProps } from '@/types';

interface ChatContextType {
    show_mobile_nav: boolean;
    setShow_mobile_nav: (show_mobile_nav: boolean) => void;
    header_nav: string; 
    setHeader_nav: (header_nav: string) => void;
    user_information: UserInfoProps | null;
    setUser_information: (user_information: UserInfoProps | null) => void;
    country_dial_code: string;
    setCountry_dial_code: (country_dial_code: string) => void;
    show_activity_history: boolean;
    setShow_activity_history: (show_activity_history: boolean) =>void;
    show_mobile_sidebar: boolean;
    setShow_mobile_sidebar: (show_mobile_sidebar: boolean) =>void;
    show_selected_chat: boolean;
    setShow_selected_chat: (show_selected_chat:boolean) => void;
    selected_user: UserInfoProps | null;
    setSelected_user: (selected_user: UserInfoProps | null)=>void;

}


// Provide a default value matching the shape of ChatContextType
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [show_mobile_nav, setShow_mobile_nav] = useState(false)
    const [header_nav, setHeader_nav] = useState('home');
    const [user_information, setUser_information] = useState<UserInfoProps | null>(null);
    const [country_dial_code, setCountry_dial_code] = useState('+234');
    const [show_activity_history, setShow_activity_history] = useState(false)
    const [show_mobile_sidebar, setShow_mobile_sidebar] = useState(false)
    const [show_selected_chat, setShow_selected_chat] = useState(false)
    const [selected_user, setSelected_user] = useState<UserInfoProps | null>(null)

    return (
        <ChatContext.Provider value={{
            show_mobile_nav, setShow_mobile_nav,
            header_nav, setHeader_nav,
            user_information, setUser_information,
            country_dial_code, setCountry_dial_code,
            show_activity_history, setShow_activity_history,
            show_mobile_sidebar, setShow_mobile_sidebar,
            selected_user, setSelected_user,
            show_selected_chat, setShow_selected_chat,
            
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
