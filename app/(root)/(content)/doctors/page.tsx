'use client'
import Navbar from '@/components/navbar'
import React from 'react'
import ConsultDoctorPage from '@/page/consult_doctor_page'
import { useChat } from '@/app/context/ChatContext'
import Loader from '@/page/loader'

const Doctors = () => {
    const { user_information} = useChat()
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <Navbar />

                <div className="w-full">
                    {
                        user_information ? 
                        <ConsultDoctorPage />
                        :
                        <Loader />
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Doctors