'use client'
import React, {useState} from 'react'
import ChatList from '@/components/chat_list'
import SelectedChat from '@/components/selected_chat'


const ConsultationPage = () => {
    const [user_role, setUser_role] = useState('physician')
    
    return (
        <div className='p-5 min-h-[calc(100vh-70px)] w-full grid grid-cols-7 gap-5 bg-gray-100 font-mont '>
            <div className="col-span-7 lg:col-span-3 h-full overflow-y-auto relative rounded-md  hide-scrollbar  ">
                <ChatList />
            </div>

            <div className="hidden lg:block lg:col-span-4 h-full">
                <SelectedChat/>
            </div>
        </div>
    )
}

export default ConsultationPage