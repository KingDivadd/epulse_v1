'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useChat } from '@/app/context/ChatContext';
import { registered_doctors } from '@/constants';
import {useRouter} from 'next/navigation'
import {toast_msg} from '@/components/toast'


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

const BoodAppointmentPageComponent = () => {
    const router = useRouter()
    const { selected_user, setSelected_user } = useChat();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const id = window.location.pathname;
        const extracted_id = id.split('/').pop() || '';

        if (!selected_user) {
            const user = registered_doctors.find((data: DoctorProps) => data.physician_id === extracted_id);
            if (user) {
                setSelected_user(user);
            } else {
                router.push('/doctors')
            }
            setLoading(false);
            } else {
            setLoading(false);
            }
    }, [selected_user, setSelected_user]);

    const handleBookAppointment = () => {
        router.push(`/doctors/appointment-booking/${selected_user?.physician_id}`)
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
        <div className='w-full'>
            <Link href="/doctors" className="text-md text-[#306ce9] flex items-center justify-start font-medium gap-1">
                <IoArrowBackOutline size="18px" />
                Back
            </Link>

            <div className="w-full grid grid-cols-12 gap-5 lg:gap-8 xl:gap-10 mt-3">
                <span className="hidden md:block col-span-6 min-h-[500px] relative rounded-lg overflow-hidden">
                    <Image
                        src={selected_user.avatar || '/default-doctor.svg'}
                        alt={`${selected_user.first_name} ${selected_user.last_name}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg"
                    />
                </span>

                <div className="col-span-12 md:col-span-6  flex flex-col min-h-[300px] gap-10 items-start justify-between bg-white shadow-md rounded-lg p-5">
                    <span className="md:hidden w-full h-[400px] relative rounded-lg overflow-hidden">
                        <Image
                            src={selected_user.avatar || '/default-doctor.svg'}
                            alt={`${selected_user.first_name} ${selected_user.last_name}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg"
                        />
                    </span>

                    <div className="w-full flex flex-col gap-5 max-md:-mt-5">
                        <span className="flex w-full flex-col gap-2.5 py-2 border-b border-gray-300">
                        <p className="text-xl font-medium">Dr. {selected_user.first_name} {selected_user.last_name}</p>
                        <p className="text-[13px] text-green-600">Available</p>
                        </span>

                        <div className="w-full flex flex-col gap-2">
                        <p className="text-[14px] font-medium">Description:</p>
                        <p className="text-[14px] leading-[25px]">{selected_user.description}</p>
                        </div>

                        <div className="w-full flex justify-start items-center gap-2">
                        <p className="text-[14px] font-medium">Specialty:</p>
                        <p className="text-[14px]">{selected_user.speciality}</p>
                        </div>

                        <div className="w-full flex justify-start items-center gap-2">
                        <p className="text-[14px] font-medium">Languages:</p>
                        <span className="flex gap-1">
                            {selected_user.languages_spoken && selected_user.languages_spoken.map((item: string, ind: number) => (
                            <p key={ind} className="text-[14px]">
                                {item}
                                {selected_user.languages_spoken && ind < selected_user.languages_spoken.length - 1 ? ',' : ''}
                            </p>
                            ))}
                        </span>
                        </div>

                        <div className="w-full flex justify-start items-center gap-2">
                        <p className="text-[14px] font-medium">Country:</p>
                        <p className="text-[14px]">{selected_user.country}</p>
                        </div>

                        <div className="w-full flex justify-start items-center gap-2">
                        <p className="text-[14px] font-medium">Workplace:</p>
                        <p className="text-[14px]">{selected_user.current_hospital_or_clinic}</p>
                        </div>
                    </div>

                    <button
                        className="h-[55px] w-full rounded-sm text-white bg-[#306ce9] hover:bg-[#306ce9]/90"
                        onClick={handleBookAppointment}
                    >
                        Book Appointment
                    </button>
                </div>
            </div>

        </div>
    )
}

export default BoodAppointmentPageComponent