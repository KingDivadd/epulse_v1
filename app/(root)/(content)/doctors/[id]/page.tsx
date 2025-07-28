'use client'
import DashboardNav from '@/components/dashboard_nav'
import React from 'react'
import BookAppointmentPage from '@/pages/book_appointment_page'

const ConsultationRoom = () => {
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <DashboardNav />

                <BookAppointmentPage />
            </div>
        </div>
    )
    }

export default ConsultationRoom