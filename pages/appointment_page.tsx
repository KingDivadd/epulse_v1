import Appointments from '@/components/appointments'
import AppointmentInformation from '@/components/appointment_information'
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
        <div className='p-5 min-h-[calc(100vh-70px)] w-full bg-gray-100 font-mont ' onClick={handleOutsideClick}>
            <div className="w-full h-full overflow-y-auto gap-5  relative bg-white rounded-md shadow-md py-5 hide-scrollbar">
                <Appointments show_selected_appointment={show_selected_appointment} setShow_selected_appointment={setShow_selected_appointment}/>

                <div className={`hidden md:block w-full md:w-[400px] lg:w-[500px] h-[400px] z-10 absolute top-0 duration-300 ${show_selected_appointment ? 'right-0':'right-[-500px]'}`}>  
                    <AppointmentInformation show_selected_appointment={show_selected_appointment} setShow_selected_appointment={setShow_selected_appointment} /> 
                </div>
            </div>
        </div>
    )
}

export default AppointmentPage