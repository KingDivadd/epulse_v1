import PhysicianAppointments from '@/components/physician_appointments'
import AppointmentInformation from '@/components/appointment_information'
import React, { useState } from 'react'

const PhysicianAppointmentPage = () => {
    

    return (
        <div className=' py-3 sm:py-5 min-h-[calc(100vh-70px)] w-full bg-gray-50 font-mont ' >
            <div className="w-full h-full overflow-y-auto relative rounded-md  hide-scrollbar ">
                <PhysicianAppointments />
            </div>
        </div>
    )
}

export default PhysicianAppointmentPage