import PatientAppointment from '@/components/patient_appointment'
import React, { useState } from 'react'

const AppointmentPage = () => {
    const [show_selected_appointment, setShow_selected_appointment] = useState(false)

    // Handler to prevent clicks inside mobile sidebar from closing it
    const handleMobileSidebarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Handler to close mobile sidebar when clicking outside
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (show_selected_appointment) {
            setShow_selected_appointment(false);
        }
    };

    return (
        <div className='py-5 min-h-[calc(100vh-70px)] w-full bg-gray-50 font-mont ' >
            <div className="w-full h-full overflow-y-auto relative rounded-md  hide-scrollbar ">
                <PatientAppointment />
            </div>
        </div>
    )
}

export default AppointmentPage