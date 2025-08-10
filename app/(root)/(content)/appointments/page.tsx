'use client'
import Navbar from '@/components/navbar'
import React from 'react'
import AppointmentPage from '@/page/appointment_page'
import PhysicianAppointmentPage from '@/page/physician/physician_appointment_page'
import { useChat } from '@/app/context/ChatContext'
import Loader from '@/page/loader'

const Appointments = () => {
    const {user_information}= useChat()

    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <Navbar />

                <div className="w-full">
                    {
                        user_information ? 
                        <>
                            {
                                user_information.role == 'patient' ? <AppointmentPage /> :  <PhysicianAppointmentPage />
                            }
                        
                        </>
                        :
                        <Loader />
                    }
                </div>

            </div>
        </div>
    )
}

export default Appointments