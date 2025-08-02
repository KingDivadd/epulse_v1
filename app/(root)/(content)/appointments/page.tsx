'use client'
import Navbar from '@/components/navbar'
import React from 'react'
import AppointmentPage from '@/page/appointment_page'
import PhysicianAppointmentPage from '@/page/physician/physician_appointment_page'
import { useChat } from '@/app/context/ChatContext'
import LoadingAppointment from '@/page/skeleton/loading_appointment'

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
                        <LoadingAppointment />
                    }
                </div>

            </div>
        </div>
    )
}

export default Appointments