
import React from 'react'
import DoctorsList from '@/components/doctors_list'

const ConsultDoctorPage = () => {
    return (
        <div className='p-5  lg:p-8 xl:p-10 w-full flex flex-col gap-5 lg:gap-8  bg-[#f2f2f2] font-mont' >
            <h3 className="font-mont font-semibold text-lg  text-gray-800">Consultation with doctors</h3>
            
            <DoctorsList />

        </div>
    )
}

export default ConsultDoctorPage