import Appointments from '@/components/appointments'
import AppointmentInformation from '@/components/appointment_information'
import React from 'react'

const AppointmentPage = () => {
    return (
        <div className='p-5 h-[calc(100vh-70px)] w-full bg-gray-100 font-mont' >
            <div className="w-full h-full overflow-y-auto hide-scrollbar grid grid-cols-6 gap-5  ">
                <div className="col-span-6 md:col-span-3">  <Appointments /></div>

                <div className="hidden md:block col-span-3">  <AppointmentInformation /> </div>
            </div>
        </div>
    )
}

export default AppointmentPage