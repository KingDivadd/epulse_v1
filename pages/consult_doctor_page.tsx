
import React from 'react'
import DoctorsList from '@/components/doctors_list'

const ConsultDoctorPage = () => {
    return (
        <div className='p-5 h-[calc(100vh-70px)] w-full bg-gray-100 font-mont' >
            <div className="w-full h-full flex flex-col  gap-5 overflow-y-auto hide-scrollbar">
                <h3 className="font-mont font-semibold text-lg  text-gray-800">Consultation with doctors</h3>
                
                <DoctorsList />
            </div>

        </div>
    )
}

export default ConsultDoctorPage