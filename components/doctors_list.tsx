'use client'
import React, { useState, useEffect } from 'react';
import { doctors_specialties, registered_doctors } from '@/constants';
import Image from 'next/image';
import { DropDownWithSearchBar } from './drop_down_component';
import { useChat } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';

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
}

const DoctorsList = () => {
    const [filter_doctor, setFilter_doctor] = useState('');
    const [filtered_doctors, setFiltered_doctors] = useState<DoctorProps[]>(registered_doctors);
    const {selected_user, setSelected_user} = useChat()
    const [imageError, setImageError] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const new_list = registered_doctors.filter((data: DoctorProps) => {
        const full_name = `${data.first_name.toLowerCase()} ${data.last_name.toLowerCase()}`;
        return (
            (filter_doctor === '' || data.speciality.toLowerCase() === filter_doctor.toLowerCase()) &&
            (full_name.includes('') ||
            data.last_name.toLowerCase().includes('') ||
            data.country.toLowerCase().includes('') ||
            data.speciality.toLowerCase().includes(''))
        );
        });
        setFiltered_doctors(new_list);
    }, [filter_doctor]);

    return (
        <div className="w-full flex flex-col gap-5 -mt-2">
            <div className="w-full flex max-sm:flex-col items-center justify-start gap-5">
                <div className="w-full flex items-center gap-5 justify-between sm:justify-start h-[45px]">
                <button
                    className="h-full rounded-sm duration-150 border border-gray-300 text-sm bg-white hover:bg-[#fafafa] px-7"
                    onClick={() => setFilter_doctor('General Practice')}
                >
                    General Doctor
                </button>
                <button
                    className="h-full rounded-sm duration-150 border border-gray-300 text-sm bg-white hover:bg-[#fafafa] px-10"
                    onClick={() => setFilter_doctor('')}
                >
                    Specialist
                </button>
                </div>

                <div className="sm:w-[350px] w-full">
                <DropDownWithSearchBar
                    dropArray={doctors_specialties}
                    selected_item={filter_doctor}
                    setSelected_item={setFilter_doctor}
                />
                </div>
            </div>

            <p className="text-md font-semibold">All Doctors</p>

            <div className="w-full max-h-[800px] hide-scrollbar overflow-y-auto scrollbar-hidden max-sm:-mt-2 -mt-1">
                {filtered_doctors.length === 0 ? (
                    <div className="w-full flex h-[400px] sm:h-[300px] rounded-lg bg-white p-5 items-center justify-center">

                        <p className="text-sm text-gray-600 text-center py-5">No doctors found with the selected criteria</p>
                    </div>
                ) : (
                <div className="w-full temp-300 ">
                    {filtered_doctors.map((data: DoctorProps, ind: number) => {
                    const { first_name, last_name, description, country, registered_as, speciality, languages_spoken, avatar, physician_id } = data;

                    return (
                        <div key={ ind} className="w-full rounded-md bg-white shadow-md p-3 flex gap-3" onClick={()=>{
                            router.push(`/doctors/${physician_id}`);
                            setSelected_user({...selected_user, ...data})
                        }}>
                            <span className="h-[100px] w-[100px] rounded-md overflow-hidden relative bg-[#f2f2f2]">
                                <Image src={avatar || '/default-doctor.svg'} alt={`${first_name} ${last_name}`} fill objectFit="cover" className="rounded-md" />
                            </span>

                            <div className="flex-1 h-full flex flex-col items-start justify-center gap-1">
                                <p className="text-[15px] font-medium">Dr. {first_name} {last_name}</p>
                                <p className="text-[12px] text-green-600">Available</p>
                                <span className="flex items-start gap-2">
                                <p className="text-[13px]">Speciality:</p>
                                <p className="text-[13px]">{speciality}</p>
                                </span>
                                <span className="flex items-center gap-2">
                                <p className="text-[13px]">Languages:</p>
                                <span className="flex gap-1">
                                    {languages_spoken.map((item: string, ind: number) => (
                                    <p key={ind} className="text-[13px]">{item}{ind < languages_spoken.length - 1 ? ',' : ''}</p>
                                    ))}
                                </span>
                                </span>
                            </div>
                        </div>
                    );
                    })}
                </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsList;