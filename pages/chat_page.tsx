'use state'
import React, {useState,useEffect} from 'react'
import ChatList from '@/components/chat_list'
import SelectedChat from '@/components/selected_chat'
import { useChat } from '@/app/context/ChatContext'

const ChatPage = () => {
    const {show_selected_chat, setShow_selected_chat} = useChat()

    const handleSelectedChatClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    return (
        <div className='p-5 h-[calc(100vh-70px)]  w-full grid grid-cols-7 gap-5 bg-gray-100 font-mont overflow-hidden' >
            <div className="col-span-7 lg:col-span-3 h-full relative">  
                <ChatList />
                
                <section
                    className={`absolute w-full md:w-[calc(100%-80px)] lg:w-[calc(100%-100px)] h-full top-0 border-r border-gray-100 lg:hidden  ${
                    show_selected_chat ? 'right-0' : 'right-[-150%]'
                    } duration-300 z-10 flex items-start justify-between`}
                    onClick={handleSelectedChatClick}
                    >
                    <SelectedChat /> 
                </section>
            </div>

            <div className="hidden lg:block col-span-4 h-full">  <SelectedChat /> </div>

            
        </div>
    )
}

export default ChatPage