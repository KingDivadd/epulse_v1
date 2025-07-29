'use client'
import React from 'react'
import DashboardNav from '@/components/dashboard_nav'
import ChatPage from '@/pages/chat_page'

const Chats = () => {
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <DashboardNav />

                <ChatPage />
            </div>
        </div>
    )
}

export default Chats