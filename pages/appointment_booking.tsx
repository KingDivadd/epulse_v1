'use client'
import React from 'react';
import DoctorConsultationList from '@/components/doctor_consultation_list'


const AppointmentBooking = () => {
    

    return (
        <div className="p-5 h-[calc(100vh-70px)] w-full bg-gray-100 font-mont min-h-[70vh]">
            <div className="w-full h-full overflow-y-auto hide-scrollbar sm:w-[75%] md:w-[65%] lg:w-[50%] rounded-lg flex flex-col gap-5">
                <h3 className="font-mont font-semibold text-lg text-gray-800">Consultation with Doctors</h3>

                <DoctorConsultationList />
            </div>
        </div>
    );
};

export default AppointmentBooking;