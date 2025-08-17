'use client'
import React from 'react';
import DoctorConsultationList from '@/components/doctor_consultation_list'


const AppointmentBooking = () => {
    

    return (
        <div className="py-3 sm:py-5 min-h-[calc(100vh-70px)] w-full bg-gray-50 font-mont ">
            <div className="w-full h-full overflow-y-auto hide-scrollbar sm:w-[100%] md:w-[75%] lg:w-[50%] rounded-lg flex flex-col gap-5">
                <h3 className="font-mont font-semibold text-[15.5px] text-gray-700 px-5">Consultation with Doctors</h3>

                <DoctorConsultationList />
            </div>
        </div>
    );
};

export default AppointmentBooking;