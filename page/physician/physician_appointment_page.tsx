import PhysicianAppointments from '@/components/physician_appointments'
import AppointmentInformation from '@/components/appointment_information'
import React, { useState } from 'react'

const PhysicianAppointmentPage = () => {
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
        <div className='p-5 min-h-[calc(100vh-70px)] w-full bg-gray-100 font-mont ' onClick={handleOutsideClick}>
            <div className="w-full h-full overflow-y-auto relative rounded-md  hide-scrollbar ">
                <PhysicianAppointments show_selected_appointment={show_selected_appointment} setShow_selected_appointment={setShow_selected_appointment}/>
            </div>
        </div>
    )
}

export default PhysicianAppointmentPage