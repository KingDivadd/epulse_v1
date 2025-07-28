import Appointments from '@/components/appointments'
import AppointmentInformation from '@/components/appointment_information'
import React from 'react'

const AppointmentPage = () => {
    return (
        <div className='p-5  lg:p-8 xl:p-10 w-full grid grid-cols-6 gap-5 lg:gap-8  bg-[#f2f2f2] font-mont' >
            <div className="col-span-6 md:col-span-3">  <Appointments /></div>

            <div className="hidden md:block col-span-3">  <AppointmentInformation /> </div>
        </div>
    )
}

export default AppointmentPage