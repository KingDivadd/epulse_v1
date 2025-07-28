'use client'
import React from 'react';
import DoctorConsultationList from '@components/doctor_consultation_list'

interface DoctorProps {
    physician_id: string;
    first_name: string;
    last_name: string;
    country: string;
    languages_spoken: string[];
    avatar: string;
    registered_as: string;
    speciality: string;
    description: string;
    current_hospital_or_clinic: string;
}

const AppointmentBooking = () => {
    

    return (
        <div className="p-5 lg:p-8 xl:p-10 w-full bg-[#f2f2f2] font-mont min-h-[70vh]">
            <div className="w-full sm:w-[75%] md:w-[65%] lg:w-[50%] rounded-lg flex flex-col gap-5">
                <h3 className="font-mont font-semibold text-lg text-gray-800">Consultation with Doctors</h3>

                <DoctorConsultationList />
            </div>
        </div>
    );
};

export default AppointmentBooking;