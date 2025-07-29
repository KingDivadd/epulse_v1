'use client'
import DashboardNav from '@/components/dashboard_nav'
import React from 'react'
import AppointmentPage from '@/pages/appointment_page'

const Appointments = () => {
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <DashboardNav />

                <AppointmentPage />
            </div>
        </div>
    )
}

export default Appointments