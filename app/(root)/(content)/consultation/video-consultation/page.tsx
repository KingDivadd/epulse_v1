'use client'
import React from 'react'
import Navbar from '@/components/navbar'
import { useChat } from '@/app/context/ChatContext'
import Loader from '@/page/loader'
import VideoConsultationPage from '@/page/video_consultation_page'

const VideoConsultation = () => {
    const {selected_appointment_info, user_information} = useChat()
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <Navbar />

                <div className="w-full">
                    {
                        user_information ? 
                        <VideoConsultationPage />
                        :
                        <Loader />
                    }
                </div>

            </div>
        </div>
    )
}

export default VideoConsultation