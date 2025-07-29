
'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { registered_doctors } from '@/constants';
import { useChat } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';
import { toast_msg } from '@/components/toast';
import { convert_to_unix } from '@/lib/date_formater';


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

const DoctorConsultationList = () => {
    const [loading, setLoading] = useState(true);
    const { selected_user, setSelected_user } = useChat();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [new_appointment, setNew_appointment] = useState({physician_id:'', appointment_type:'', mode_of_consult:'virtual', complain:'', time:0})
    const [selected_time, setSelected_time] = useState('')
    const [selected_date, setSelected_date] = useState('')

    useEffect(() => {
        if (selected_date && selected_time) {
            const date_time = `${selected_date} ${selected_time}`
            const unix_date_time = convert_to_unix(date_time)
            setNew_appointment({...new_appointment, time:unix_date_time})
        }
    
    }, [selected_date, selected_time])

    // Generate time slots at 30-minute intervals
    const timeSlots = Array.from({ length: 48 }, (_, i) => {
        const hours = Math.floor(i / 2);
        const minutes = i % 2 === 0 ? '00' : '30';
        const period = hours < 12 ? 'AM' : 'PM';
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${displayHours}:${minutes} ${period}`;
    });

    useEffect(() => {
        const id = window.location.pathname;
        const extracted_id = id.split('/').pop() || '';

        if (!selected_user) {
        const user = registered_doctors.find((data: DoctorProps) => data.physician_id === extracted_id);
        if (user) {
            setSelected_user(user);
        } else {
            router.push('/doctors');
        }
        setLoading(false);
        } else {
        setLoading(false);
        }
    }, [selected_user, setSelected_user, router]);

    const handle_submit = async (e: React.FormEvent) => {
        e.preventDefault();
        toast_msg({ title: 'Appointment booking in progress' });
    };

    if (loading) {
        return (
        <div className="w-full h-[80vh] flex items-center justify-center bg-[#f2f2f2]">
            <p className="text-md font-medium font-mont">Loading...</p>
        </div>
        );
    }

    if (error || !selected_user) {
        return (
        <div className="w-full h-[80vh] flex items-center justify-center bg-[#f2f2f2]">
            <p className="text-md font-medium font-mont text-red-500">{error || 'Doctor not found'}</p>
        </div>
        );
    }

    return (
        <div className="w-full">
             <Link
                href={`/doctors/${selected_user.physician_id}`}
                className="text-md text-[#306ce9] flex items-center justify-start font-medium gap-1"
                >
                <IoArrowBackOutline size="18px" />
                Back
                </Link>

                <div className="w-full flex flex-col gap-3">
                <h3 className="font-medium text-md text-start">Select the date and time you would like to have your appointment.</h3>
                <h3 className="text-[14px] text-start">Please note that appointments can only be selected at 30-minute intervals.</h3>

                <form onSubmit={handle_submit} className="flex flex-col gap-5 p-5 rounded-md bg-white w-full">
                    <span className="w-full flex flex-col gap-2 mt-5">
                    <p className="text-sm">Mode of Consultation</p>
                    <select
                        name="appointment_type"
                        id="appointment_type"
                        className="h-[50px] w-full border border-gray-300 bg-white px-5 rounded-sm"
                        onChange={(e)=> setNew_appointment({...new_appointment, appointment_type:e.target.value})}
                    >
                        <option value="video">Video</option>
                        <option value="chat">Chat</option>
                    </select>
                    </span>

                    <span className="w-full flex flex-col gap-2 mt-5">
                        <p className="text-sm">Date for Consultation</p>
                        <input type="date" name="date" id="date" onChange={(e)=> setSelected_date(e.target.value)} className="h-[50px] border border-gray-300 px-5 rounded-sm w-full" />
                    </span> 

                    <span className="w-full flex flex-col gap-2 mt-5">
                        <p className="text-sm">Time for Consultation</p>
                        <select
                            name="time"
                            id="time"
                            className="h-[50px] w-full border border-gray-300 bg-white px-5 rounded-sm"
                            onChange={(e)=> setSelected_time(e.target.value)}
                        >
                            {timeSlots.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </span>

                    <span className="w-full flex flex-col gap-2 mt-5">
                        <p className="text-sm">Complaint Brief</p>
                        <textarea
                            placeholder="A brief description of your complaint..."
                            name="complaint"
                            id="complaint"
                            className="w-full h-[100px] border border-gray-300 px-3 py-2 rounded-sm resize-none"
                            onChange={(e)=> setNew_appointment({...new_appointment, complain:e.target.value})}
                        ></textarea>
                    </span>

                    <button type="submit" className="h-[50px] mt-5 rounded-sm text-white bg-[#306ce9] hover:bg-[#306ce9]/90 text-sm" onClick={handle_submit} > Proceed
                    </button>
                </form>
                </div>
        </div>
    )
}

export default DoctorConsultationList