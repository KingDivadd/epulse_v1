
import React from 'react'
import DoctorsList from '@/components/doctors_list'

const ConsultDoctorPage = () => {
    return (
        <div className='p-5 min-h-[calc(100vh-70px)] w-full bg-gray-100 font-mont' >
            <div className="w-full h-full flex flex-col  gap-2 overflow-y-auto hide-scrollbar sm:bg-white py-5 rounded-md sm:shadow-md">
                <h3 className="sm:px-5 font-mont font-semibold text-lg  text-gray-800">Consultation with doctors</h3>
                
                <DoctorsList />
            </div>

        </div>
    )
}

export default ConsultDoctorPage