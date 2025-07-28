
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CiEdit } from 'react-icons/ci';
import { InputComponent3 } from '@/components/auth_components/input_component';
import PhoneInputComponent from '@/components/auth_components/phone_input_component';
import DateOfBirth from '@/components/auth_components/date_of_birth';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {genotypes, blood_groups} from "@/constants"
import { useChat } from '@/app/context/ChatContext';

interface FormInformation {
    first_name: string;
    last_name: string;
    avatar: string;
    gender: string;
    country_code: string;
    phone_number: string;
    country: string;
    weight: string;
    height: string;
    blood_group: string;
    date_of_birth: string;
    genotype: string;
}

const SettingsPage = () => {
    const {user_information, country_dial_code} = useChat()
    const [position, setPosition] = useState('')
    const [information, setInformation] = useState<FormInformation>({
        first_name: '',last_name: '',avatar: '',gender: '', country_code: '', phone_number: '',country: '',  weight: '', height: '', blood_group: '',genotype: '', date_of_birth: '',
    });

    useEffect(() => {
        setInformation({...information, gender: position.toLowerCase(), country_code: country_dial_code})
    }, [position, country_dial_code])

    useEffect(() => {
        setInformation({...information, date_of_birth: user_information?.date_of_birth || Math.floor(Date.now() / 1000).toString()}) 
    }, [user_information?.date_of_birth])

    const handle_change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInformation({ ...information, [name]: value });
    };

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add API call or save logic here
        console.log('Saving changes:', information);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full bg-[#f2f2f2] font-mont min-h-[70vh]">
            <form onSubmit={handle_submit} className=" max-lg:max-w-5xl xl:w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 bg-white p-4 sm:p-6 lg:p-8 rounded-lg">
                {/* Profile Image Section */}
                    <div className="flex flex-col justify-between items-center gap-10 md:gap-4  ">
                        <span className=" w-[150px] h-[150px] sm:w-[275px] sm:h-[275px] lg:w-[300px] lg:h-[300px] xl:w-[275px] xl:h-[275px] relative overflow-hidden mx-auto">
                        <Image
                            src={information.avatar || '/profile-img-2c.jpg'}
                            alt="Profile"
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-full"
                        />
                        <CiEdit size="20px" className="absolute text-[#306ce9] bottom-3 right-3 sm:bottom-5 sm:right-5 cursor-pointer" />
                        </span>
                        <button
                        type="submit"
                        className="hidden md:block h-[50px] w-full rounded-sm text-sm text-white bg-[#306ce9] hover:bg-[#306ce9]/90" >
                        Update Information
                        </button>
                    </div>

                    {/* Personal Info Section */}
                    <div className="flex flex-col gap-4 ">
                        <InputComponent3
                        title="First Name"
                        type="text"
                        name="first_name"
                        value={information.first_name}
                        onChange={handle_change}
                        />
                        <InputComponent3
                        title="Last Name"
                        type="text"
                        name="last_name"
                        value={information.last_name}
                        onChange={handle_change}
                        />
                        <InputComponent3
                        title="Country"
                        type="text"
                        name="country"
                        value={information.country}
                        onChange={handle_change}
                        />
                        <span className="flex flex-col gap-2 w-full">
                        <p className="text-sm font-medium">Phone Number</p>
                        <PhoneInputComponent
                            country_code={information.country_code}
                            phone_number={information.phone_number}
                            on_change={handle_change}
                        />
                        </span>
                        <span className="flex flex-col gap-2 w-full">
                            <p className="text-sm font-medium">Gender</p>
                            <select
                                name="gender"
                                id="gender"
                                className="w-full h-[50px] border border-slate-400 px-2 bg-white text-sm rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]"
                                value={information.gender}
                                onChange={handle_change}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </span>
                    </div>

                    {/* Health Info Section */}
                    <div className="flex flex-col gap-4 ">
                        <span className="flex flex-col gap-2 w-full">
                        <p className="text-sm font-medium">Date of Birth</p>
                        <DateOfBirth />
                        </span>
                        
                        <span className="flex flex-col gap-2 w-full">
                            <p className="text-sm font-medium">Blood Group</p>
                            <select
                                name="blood_group"
                                id="blood_group"
                                className="w-full h-[50px] border border-slate-400 px-2 bg-white text-sm rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]"
                                value={information.blood_group}
                                onChange={handle_change}
                            >
                                <option value="">Select Blood Groupp</option>
                                {
                                    blood_groups.map((item:string, ind:number)=>{
                                        return(
                                            <option key={ind} value={item}>{item}</option>

                                        )
                                    })
                                }
                            </select>
                        </span>

                        <span className="flex flex-col gap-2 w-full">
                            <p className="text-sm font-medium">Genotype</p>
                            <select
                                name="genotype"
                                id="genotype"
                                className="w-full h-[50px] border border-slate-400 px-2 bg-white text-sm rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]"
                                value={information.genotype}
                                onChange={handle_change}
                            >
                                <option value="">Select Genotype</option>
                                {
                                    genotypes.map((item:string, ind:number)=>{
                                        return(
                                            <option key={ind} value={item}>{item}</option>

                                        )
                                    })
                                }
                            </select>
                        </span>

                        <InputComponent3
                        title="Height (cm)"
                        type="text"
                        name="height"
                        value={information.height}
                        onChange={handle_change}
                        />
                        <InputComponent3
                        title="Weight (kg)"
                        type="text"
                        name="weight"
                        value={information.weight}
                        onChange={handle_change}
                        />
                    </div>
                <button
                        type="submit"
                        className="md:hidden mt-5 h-[50px] w-full rounded-sm text-sm text-white bg-[#306ce9] hover:bg-[#306ce9]/90" >
                        Update Information
                        </button>
                </div>

            </form>
        </div>
    );
};

export default SettingsPage;