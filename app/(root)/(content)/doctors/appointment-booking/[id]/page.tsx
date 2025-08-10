'use client'
import React from 'react'
import Navbar from '@/components/navbar'
import AppointmentBooking from "@/page/appointment_booking"

const AppointmentBookingPage = () => {
    return (
        <div  className='w-full h-full flex flex-col  overflow-y-auto'>
            <div className="w-full">
                <Navbar />

                <AppointmentBooking />
            </div>
        </div>
    )
}

export default AppointmentBookingPage