'use client'
import React, { useState, useEffect } from 'react';
import BookAppointmentPageComponent from '@/components/book_appointment_page_component'



const BookAppointmentPage = () => {
    

    return (
        <div className="p-5 lg:p-8 xl:p-10 w-full flex flex-col gap-5 bg-[#f2f2f2] font-mont">
            <h3 className="font-mont font-semibold text-lg text-gray-800">Consultation with Doctors</h3>

            <BookAppointmentPageComponent />
        </div>
    );
};

export default BookAppointmentPage;