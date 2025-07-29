'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { doctors_specialties, registered_doctors } from '@/constants';
import Image from 'next/image';
import { DropDownWithSearchBar } from './drop_down_component';
import { useChat } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';
import { toast_msg } from './toast';
import { get_auth_request } from '@/app/api';
import { AxiosResponseHeaders } from 'axios';
import { HiFilter } from 'react-icons/hi';
import { IoCaretUp, IoCaretDown } from 'react-icons/io5';
import { MessageSquare, VideoIcon } from 'lucide-react';

interface DoctorProps {
    first_name: string;
    last_name: string;
    description: string;
    country: string;
    registered_as: string;
    speciality: string;
    languages_spoken: string[];
    avatar: string;
    current_hospital_or_clinic: string;
    physician_id: string;
    gender?: string;
}

const DoctorsList = () => {
    const [filter_doctor, setFilter_doctor] = useState('');
    const [doctors, setDoctors] = useState<DoctorProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const { selected_user, setSelected_user } = useChat();
    const router = useRouter();
    const [show_filter, setShow_filter] = useState(false);
    const doctorsPerPage = 8;

    // Filter doctors based on specialty
    const filteredDoctors = useMemo(() => {
        console.log('Filtered Doctors:', doctors.filter((data) => {
        const full_name = `${data.first_name.toLowerCase()} ${data.last_name.toLowerCase()}`;
        return filter_doctor === '' || data.speciality.toLowerCase() === filter_doctor.toLowerCase();
        }));
        return doctors.filter((data) => {
        const full_name = `${data.first_name.toLowerCase()} ${data.last_name.toLowerCase()}`;
        return filter_doctor === '' || data.speciality.toLowerCase() === filter_doctor.toLowerCase();
        });
    }, [doctors, filter_doctor]);

    // Fetch doctors from server with pagination
    const fetch_doctors_from_server = useCallback(async (pageNum: number) => {
        if (loading) return;
        setLoading(true);
        try {
        const res = await get_auth_request(`auth/all-physicians/${pageNum}/${doctorsPerPage}`) as AxiosResponseHeaders;
        console.log('API Response:', res);

        if (res.status === 200 || res.status === 201) {
            const new_doctors: DoctorProps[] = res.data?.data.physicians || [];
            console.log('New Doctors:', new_doctors);
            setDoctors((prev) => {
            const updatedDoctors = pageNum === 1 ? new_doctors : [...prev, ...new_doctors];
            console.log('Updated Doctors State:', updatedDoctors);
            return updatedDoctors;
            });
            const total = res.data?.data.total_number_of_physicians || 0;
            console.log('Total Physicians:', total);
            setTotalPages(Math.ceil(total / doctorsPerPage));
        } else if (res.status === 401) {
            toast_msg({ title: 'Session has expired, kindly login again' });
            router.push('/login');
        } else if (res.status === 500) {
            toast_msg({ title: 'Network error, kindly refresh your page.', type: 'danger' });
            router.refresh();
        } else {
            const error_msg = `${res.response?.data?.msg || 'An error occurred while fetching doctors.'}`;
            toast_msg({ title: error_msg, type: 'danger' });
        }
        } catch (error) {
        console.error('Fetch Error:', error);
        } finally {
        setLoading(false);
        }
    }, [loading, router]);

    // Initial fetch on mount
    useEffect(() => {
        fetch_doctors_from_server(1);
    }, []);

    // Handle page change
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
        fetch_doctors_from_server(page);
        }
    };

    return (
        <div className="w-full flex flex-col gap-5 -mt-2 py-5 rounded-md">
            <div className="w-[calc(100%-40px)] mx-auto flex flex-col p-2 shadow-md duration-300 gap-2">
                <div className="w-full h-[45px] py-3 flex items-center justify-between cursor-pointer px-5 " onClick={() => setShow_filter(!show_filter)}>
                    <span className="h-[45px] flex items-center justify-start gap-2 ">
                        <HiFilter size={'18px'} className="text-gray-700" />
                        <p className="text-md">Filter</p>
                    </span>
                    <span className="h-full flex items-center justify-center">
                        {show_filter ? <IoCaretUp size={'20px'} className="text-gray-700" /> : <IoCaretDown size={'20px'} className="text-gray-700" />}
                    </span>
                </div>

                {show_filter && (
                <div className="w-full flex flex-col xl:flex-row xl:flex-wrap gap-5 duration-300">
                    <div className="flex items-center gap-3 justify-between sm:justify-start">
                    <button
                        className="h-[45px] rounded-sm duration-150 border border-gray-300 text-sm bg-white hover:bg-[#fafafa] w-full xl:w-[230px]"
                        onClick={() => setFilter_doctor('General Practice')}
                    >
                        General Doctor
                    </button>
                    <button
                        className="h-[45px] rounded-sm duration-150 border border-gray-300 text-sm bg-white hover:bg-[#fafafa] w-full xl:w-[230px]"
                        onClick={() => setFilter_doctor('')}
                    >
                        Specialist
                    </button>
                    </div>
                    <div className="xl:w-[230px] w-full">
                    <DropDownWithSearchBar
                        dropArray={doctors_specialties}
                        selected_item={filter_doctor}
                        setSelected_item={setFilter_doctor}
                    />
                    </div>
                </div>
                )}
            </div>

            <p className="text-md font-semibold px-5">All Doctors</p>

            <div className="w-full max-h-[800px] overflow-y-auto scrollbar-hidden py-2 max-sm:-mt-2 -mt-1 hide-scrollbar">
                {filteredDoctors.length === 0 ? (
                <div className="px-5 w-full flex h-[500px] sm:h-[600px] rounded-lg bg-white p-5 items-center justify-center">
                    <p className="text-sm text-gray-600 text-center py-2">No doctors found with the selected criteria</p>
                </div>
                ) : (
                <div className="px-5 w-full flex flex-col gap-5">
                    <div className="w-full temp-240 gap-5">
                    {filteredDoctors
                        .slice((currentPage - 1) * doctorsPerPage, currentPage * doctorsPerPage)
                        .map((data: DoctorProps, ind: number) => {
                        const { first_name, last_name, registered_as, languages_spoken, avatar, physician_id, gender = 'Not specified' } = data;

                        return (
                            <div key={ind} className="w-full" onClick={() => {
                            router.push(`/doctors/${physician_id}`);
                            setSelected_user({ ...data });
                            }}>
                            <div className={`ease-in-out duration-150 w-full flex flex-col font-mont rounded-lg box-shadow-1 shadow-md hover:bg-[#306ce9] group`}>
                                <div className="w-full min-h-[240px] flex flex-col items-center gap-7 p-3 sm:p-5">
                                <span className="relative overflow-hidden rounded-full h-17 w-17">
                                    <Image src={avatar || '/profile-img-2c.jpg'} alt="" fill className="object-cover" />
                                </span>
                                <div className="w-full flex flex-col items-center gap-2 md:gap-3">
                                    <p className="text-[14px] font-medium text-gray-700 group-hover:text-white">Dr {last_name} {first_name}</p>
                                    <p className="text-sm text-gray-700 group-hover:text-white text-center w-full">{registered_as || 'Physical Medicine and Rehabilitation'}</p>
                                    <span className="w-full flex items-center justify-center gap-2">
                                    {['English', 'Yoruba'].map((item: string, ind: number) => (
                                        <p key={ind} className="text-[14px] text-gray-700 group-hover:text-white">{item}</p>
                                    ))}
                                    </span>
                                </div>
                                </div>
                                <span className="h-[50px] w-full flex items-center gap-3 border-t group-hover:text-white group-hover:border-blue-400 border-gray-200">
                                <span className="flex items-center justify-center h-[50px] w-full text-[13px] gap-2">
                                    <MessageSquare className="" size={'15px'} />
                                    Chat
                                </span>
                                <span className="flex items-center justify-center h-[50px] w-full text-[13px] gap-2">
                                    <VideoIcon className="" size={'15px'} />
                                    Video
                                </span>
                                </span>
                            </div>
                            </div>
                        );
                        })}
                    </div>
                </div>
                )}
            </div>

            {/* Pagination */}
            {filteredDoctors.length > 0 && (
                <div className="w-full px-5 flex items-center justify-center gap-4 mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-5 py-2.5 bg-white border border-gray-500 rounded-full disabled:text-gray-400 text-sm"
                >
                    Previous
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-7 py-2.5 bg-white border border-gray-500 rounded-full disabled:text-gray-400 text-sm"
                >
                    Next
                </button>
                </div>
            )}
        </div>
    );
};

export default DoctorsList;