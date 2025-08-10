
import React from 'react'
import DoctorsList from '@/components/doctors_list'

const ConsultDoctorPage = () => {
    return (
        <div className='py-5  min-h-[calc(100vh-70px)] w-full bg-gray-50 font-mont' >
            <div className="w-full h-full flex flex-col overflow-y-auto hide-scrollbar ">
                
                <DoctorsList />
            </div>

        </div>
    )
}

export default ConsultDoctorPage