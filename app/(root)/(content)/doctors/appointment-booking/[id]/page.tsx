import React from 'react'
import DashboardNav from '@/components/dashboard_nav'
import AppointmentBooking from "@/pages/appointment_booking.tsx"

const AppointmentBookingPage = () => {
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <DashboardNav />

                <AppointmentBooking />
            </div>
        </div>
    )
}

export default AppointmentBookingPage