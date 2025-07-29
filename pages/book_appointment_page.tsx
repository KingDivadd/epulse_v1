'use client'
import React, { useState, useEffect } from 'react';
import BookAppointmentPageComponent from '@/components/book_appointment_page_component'



const BookAppointmentPage = () => {
    

    return (
        <div className="h-[calc(100vh-70px)] p-5  w-full bg-gray-100 font-mont">
            <div className="w-full h-full overflow-y-auto hide-scrollbar flex flex-col gap-5">
                <h3 className="font-mont font-semibold text-lg text-gray-800">Consultation with Doctors</h3>

                <BookAppointmentPageComponent />
            </div>
        </div>
    );
};

export default BookAppointmentPage;