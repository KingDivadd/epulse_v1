
'use client'
import React, { useState, useEffect } from 'react';
import { InputComponent3 } from '@/components/auth_components/input_component';
import PhoneInputComponent from '@/components/auth_components/phone_input_component';
import DateOfBirth from '@/components/auth_components/date_of_birth';
import {genotypes, blood_groups} from "@/constants"
import { useChat } from '@/app/context/ChatContext';
import { ImgUploader } from '@/lib/file_uploader';
import { toast_msg } from '@/lib/toast';
import { patch_auth_request } from '@/app/api';
import { AxiosResponseHeaders } from 'axios';
import { Loader2Icon } from 'lucide-react'

interface FormInformation {
    first_name?: string;
    last_name?: string;
    avatar?: string;
    gender?: string;
    country_code?: string;
    phone_number?: string;
    country?: string;
    weight?: number;
    height?: number;
    blood_group?: string;
    date_of_birth?: number;
    genotype?: string;
}

const PatientProfile = () => {
    const {user_information, setUser_information, country_dial_code} = useChat()
    const [position, setPosition] = useState('')
    const [information, setInformation] = useState<FormInformation>({
        first_name: '',last_name: '',avatar: '',gender: '', country_code: '', phone_number: '',country: '',  weight: 0, height: 0, blood_group: '',genotype: '', date_of_birth: 0,
    });
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if (user_information){

            const {first_name,last_name, avatar, gender, country_code, phone_number,country,  weight, height, blood_group,genotype, date_of_birth} = user_information
    
            setTimeout(() => { 
                setInformation({first_name ,last_name, avatar,gender, country_code, phone_number,country,  weight, height, blood_group,genotype, date_of_birth})
            }, 500);
        }
    }, [])

    useEffect(() => {
        setInformation({...information, gender: position.toLowerCase(), country_code: country_dial_code})
    }, [position, country_dial_code])

    useEffect(() => {
        if (user_information?.date_of_birth){

            setInformation({...information, date_of_birth: Number(user_information?.date_of_birth) || Math.floor(Date.now() / 1000)}) 
        }
    }, [user_information?.date_of_birth])

    const handle_change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setInformation({ ...information, [name]: (name == 'height' || name == 'weight')? Number(value):value.trim() });
    };

    const handle_submit = async(e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true)

        if (information.avatar){
            setUser_information({...user_information, avatar:information.avatar})
        }

        if (navigator.onLine == false) {
            return toast_msg({title:'Please connect to the internet before proceeding', type: 'danger'})
        }

        try {

            const res = await patch_auth_request(`auth/edit-patient-data`, information) as AxiosResponseHeaders

            console.log(res)

            if (res.status == 200 || res.status == 201) {
                
                toast_msg({title:'Profile updated successfully'})

                setUser_information({...user_information, ...res.data.user})
                
                setLoading(false)
            }else{
                console.log(res)
                toast_msg({title: res.response.data.msg})
            }
            
        } catch (err) {
            console.log('error during patient profile update :: ',err)
        }finally{
            setLoading(false)
        }
    };

    function handle_file_upload(file:string, id?:string) {
        setInformation({...information, [id!]:file})
    }

    return (
        
        <div className=" p-5 min-h-[calc(100vh-70px)] w-full bg-gray-50 font-mont overflow-y-auto ">
            {user_information && <div className="h-full ">
                
                <form onSubmit={handle_submit} className="h-full max-lg:max-w-5xl xl:w-full mx-auto">
                    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Profile Image Section */}
                        <div className="col-span-1 flex flex-col gap-5 bg-white p-5 rounded-md shadow-md  justify-between  ">
                            <span className="h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] lg:w-[320px] lg:h-[320px] flex mx-auto justify-center relative group ring-5 ring-blue-200 rounded-full mt-3">
                                <ImgUploader id={'avatar'} title={''} url={information.avatar!} onFileUpload={handle_file_upload} />                                
                            </span>

                            <div className="w-full flex flex-col gap-5">

                                <InputComponent3 title="First Name" type="text" name="first_name" value={information.first_name!} onChange={handle_change}  />

                                <InputComponent3 title="Last Name" type="text" name="last_name" value={information.last_name!} onChange={handle_change} />
                                <InputComponent3 title="Country" type="text" name="country" value={information.country!} onChange={handle_change} />
                                
                                {/* <button type="submit" className="hidden md:flex h-[50px] w-full rounded-sm text-[13px] text-white bg-[#306ce9] hover:bg-[#306ce9]/90 items-center justify-center" onClick={handle_submit} >
                                    {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Update'}
                                </button> */}
                            </div>

                        </div>

                        {/* Health Info Section */}
                        <div className="bcol-span-1 flex flex-col gap-5 bg-white p-5 rounded-md shadow-md  ">
                            <span className="flex flex-col gap-2 w-full">
                                <p className="text-[13px] font-medium text-slate-700 font-mont">Phone Number</p>
                                <PhoneInputComponent
                                    country_code={information.country_code!}
                                    phone_number={information.phone_number!}
                                    on_change={handle_change}
                                />
                            </span>
                            <span className="flex flex-col gap-2 w-full">
                                <p className="text-[13px] font-medium text-slate-700 font-mont">Gender</p>
                                <select
                                    name="gender"
                                    id="gender"
                                    className="w-full h-[50px] border border-slate-400 px-2 bg-white text-[13px] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]"
                                    value={information.gender}
                                    onChange={handle_change}
                                >
                                    <option value="" className='text-[13px]' >Select Gender</option>
                                    <option value="male" className='text-[13px]' >Male</option>
                                    <option value="female" className='text-[13px]' >Female</option>
                                    <option value="other" className='text-[13px]' >Other</option>
                                </select>
                            </span>
                            <span className="flex flex-col gap-2 w-full">
                                <p className="text-[13px] font-medium text-slate-700 font-mont">Date of Birth</p>
                                <DateOfBirth />
                            </span>
                            
                            <span className="flex flex-col gap-2 w-full">
                                <p className="text-[13px] font-medium text-slate-700 font-mont">Blood Group</p>
                                <select
                                    name="blood_group"
                                    id="blood_group"
                                    className="w-full h-[50px] border border-slate-400 px-2 bg-white text-[13px] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]"
                                    value={information.blood_group}
                                    onChange={handle_change}
                                >
                                    <option value="" className='text-[13px]'>Select Blood Groupp</option>
                                    {
                                        blood_groups.map((item:string, ind:number)=>{
                                            return(
                                                <option key={ind} value={item} className='text-[13px]'>{item}</option>

                                            )
                                        })
                                    }
                                </select>
                            </span>

                            <span className="flex flex-col gap-2 w-full">
                                <p className="text-[13px] font-medium text-slate-700 font-mont">Genotype</p>
                                <select
                                    name="genotype"
                                    id="genotype"
                                    className="w-full h-[50px] border border-slate-400 px-2 bg-white text-[13px] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]"
                                    value={information.genotype}
                                    onChange={handle_change}
                                >
                                    <option value="" className='text-[13px]'>Select Genotype</option>
                                    {
                                        genotypes.map((item:string, ind:number)=>{
                                            return(
                                                <option key={ind} value={item} className='text-[13px]'>{item}</option>

                                            )
                                        })
                                    }
                                </select>
                            </span>

                            <InputComponent3
                                title="Height (cm)"
                                type="number"
                                name="height"
                                value={information.height || 0}
                                onChange={handle_change}
                            />
                            <InputComponent3
                                title="Weight (kg)"
                                type="number"
                                name="weight"
                                value={information.weight || 0}
                                onChange={handle_change}
                            />
                        </div>

                        <button type="submit" className="lg:col-start-2 h-[50px] w-full rounded-sm text-[13px] text-white bg-[#306ce9] hover:bg-[#306ce9]/90 flex items-center justify-center" onClick={handle_submit} >
                            {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Update'}
                        </button>
                    </div>

                </form>
                
            </div>}
        </div>
    );
};

export default PatientProfile;