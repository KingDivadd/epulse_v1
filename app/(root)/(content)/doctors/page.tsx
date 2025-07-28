'use client'
import DashboardNav from '@/components/dashboard_nav'
import React from 'react'
import ConsultDoctorPage from '@/page/consult_doctor_page'

const Doctors = () => {
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <DashboardNav />

                <ConsultDoctorPage />
            </div>
        </div>
    )
}

export default Doctors