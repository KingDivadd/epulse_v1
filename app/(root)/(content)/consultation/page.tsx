'use client'
import React from 'react'
import Navbar from '@/components/navbar'
import ConsultationPage from '@/page/consultation_page'
import LoadingConsultation from '@/page/skeleton/loading_consultation'
import { useChat } from '@/app/context/ChatContext'


const Consultation = () => {
    const {user_information} = useChat()

    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <Navbar />

                <div className="w-full">
                    {
                        user_information ? 
                        <ConsultationPage />
                        :
                        <LoadingConsultation />
                    }
                </div>

                
            </div>
        </div>
    )
}

export default Consultation