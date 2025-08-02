
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
import { ImgUploader } from '@/lib/file_uploader';
import { Skeleton } from '@/components/ui/skeleton';

interface FormInformation {
    first_name: string;
    last_name: string;
    avatar: string;
    gender: string;
    country_code: string;
    phone_number: string;
    country: string;
    weight: number;
    height: number;
    blood_group: string;
    date_of_birth: string;
    genotype: string;
}

const SettingsPage = () => {
    const {user_information, setUser_information, country_dial_code} = useChat()
    const [position, setPosition] = useState('')
    const [information, setInformation] = useState<FormInformation>({
        first_name: '',last_name: '',avatar: '',gender: '', country_code: '', phone_number: '',country: '',  weight: 0, height: 0, blood_group: '',genotype: '', date_of_birth: '',
    });
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        // dumping user information
        setTimeout(() => {
            setInformation({...information, ...user_information})
        }, 500);
    }, [])

    useEffect(() => {
        setInformation({...information, gender: position.toLowerCase(), country_code: country_dial_code})
    }, [position, country_dial_code])

    useEffect(() => {
        setInformation({...information, date_of_birth: user_information?.date_of_birth || Math.floor(Date.now() / 1000).toString()}) 
    }, [user_information?.date_of_birth])

    const handle_change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setInformation({ ...information, [name]: (name == 'height' || name == 'weight')? Number(value):value });
    };

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add API call or save logic here
        console.log('Saving changes:', information);
        if (information.avatar){
            setUser_information({...user_information, avatar:information.avatar})
        }
    };

    function handle_file_upload(file:string, id?:string) {
        console.log('image uploaded successfully')
        setInformation({...information, [id!]:file})
    }

    return (
        <div className="p-5 h-[calc(100vh-70px)] w-full bg-gray-100 font-mont ">
            <div className="h-full overflow-y-auto hide-scrollbar">
                
                <form onSubmit={handle_submit} className=" max-lg:max-w-5xl xl:w-full mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {/* Profile Image Section */}
                        <div className="col-span-1 flex flex-col gap-15 bg-white p-5 rounded-md shadow-md  justify-between  ">
                            <span className="h-[300px] w-[300px] md:h-[200px] md:w-[200px] lg:w-[320px] lg:h-[320px] flex mx-auto justify-center relative group">
                                <ImgUploader id={'avatar'} title={''} url={''} onFileUpload={handle_file_upload} />                                
                            </span>
                            
                            <button type="submit" className="hidden md:block h-[50px] w-full rounded-sm text-sm text-white bg-[#306ce9] hover:bg-[#306ce9]/90" >
                            Update Information
                            </button>
                        </div>

                        {/* Personal Info Section */}
                        <div className="col-span-1 flex flex-col gap-5 bg-white p-5 rounded-md shadow-md ">
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
                                <p className="text-sm font-medium text-slate-700 font-mont">Phone Number</p>
                                <PhoneInputComponent
                                    country_code={information.country_code}
                                    phone_number={information.phone_number}
                                    on_change={handle_change}
                                />
                            </span>
                            <span className="flex flex-col gap-2 w-full">
                                <p className="text-sm font-medium text-slate-700 font-mont">Gender</p>
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
                        <div className="bcol-span-1 flex flex-col gap-5 bg-white p-5 rounded-md shadow-md  ">
                            <span className="flex flex-col gap-2 w-full">
                            <p className="text-sm font-medium text-slate-700 font-mont">Date of Birth</p>
                            <DateOfBirth />
                            </span>
                            
                            <span className="flex flex-col gap-2 w-full">
                                <p className="text-sm font-medium text-slate-700 font-mont">Blood Group</p>
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
                                <p className="text-sm font-medium text-slate-700 font-mont">Genotype</p>
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
                                type="number"
                                name="height"
                                value={information.height}
                                onChange={handle_change}
                            />
                            <InputComponent3
                                title="Weight (kg)"
                                type="number"
                                name="weight"
                                value={information.weight}
                                onChange={handle_change}
                            />
                        </div>

                        <button type="submit" className="md:hidden mt-5 h-[50px] w-full rounded-sm text-sm text-white bg-[#306ce9] hover:bg-[#306ce9]/90" >
                            Update Information
                        </button>
                    </div>

                </form>
                
            </div>
        </div>
    );
};

export default SettingsPage;