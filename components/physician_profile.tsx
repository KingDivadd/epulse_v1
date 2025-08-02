'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { InputComponent3 } from '@/components/auth_components/input_component';
import PhoneInputComponent from '@/components/auth_components/phone_input_component';
import {doctors_specialties} from '@/constants'
import { Loader2Icon } from 'lucide-react';
import { Button } from 'react-day-picker';
import { toast_msg } from '@/lib/toast';
import {FileUploader, FileUploaderNew, ImgUploader} from '@/lib/file_uploader'
import { CiEdit } from "react-icons/ci";

interface PhysicianFormInfoProps {
    first_name: string;
    last_name: string;
    avatar: string;
    gender: string;
    country_code: string;
    phone_number: string;
    country: string;
    state: string;
    address: string;
    registered_as: string;
    specialty: string;
    medical_licence:string;

}



const PhysicianProfileComponent = () => {
    const [loading, setLoading] = useState(false)
    const [physician_info, setPhysician_info] = useState<PhysicianFormInfoProps>({first_name:"", last_name:"", avatar:'',gender:'',country_code:'',phone_number:'', country:'', address: '', registered_as:'',specialty:'', state:'', medical_licence:''})

    const handle_change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPhysician_info({ ...physician_info, [name]: value.replace(/ /, '_').toLowerCase() });
    };

    const handle_submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add API call or save logic here
        console.log('Saving changes:', physician_info);
        toast_msg({title: 'Profile updated successfully, approval in progress.'})
    };

    function handle_file_upload(file:string, id?:string) {
        console.log(id,' : ', file)
        setPhysician_info({...physician_info, [id!]:file})
    }

    return (
        <div className="w-full h-full gap-5 font-mont grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
            {/* the first column */}
            <div className="col-span-1 flex flex-col gap-5 bg-white p-5 rounded-md shadow-md  ">
                <span className="h-[300px] w-[300px] md:h-[200px] md:w-[200px] lg:w-[320px] lg:h-[320px] flex mx-auto justify-center relative group">
                    <ImgUploader id={'profile-img'} title={''} url={'/profile-img-2a.jpg'} onFileUpload={handle_file_upload} />

                    
                </span>

                <InputComponent3 title="First Name" type="text" name="first_name"  value={physician_info.first_name} onChange={handle_change}  />

                <InputComponent3 title="Last Name" type="text" name="last_name"  value={physician_info.last_name} onChange={handle_change}  />

                <span className="flex flex-col gap-2 w-full">
                    <p className="text-sm font-medium text-slate-700 font-mont">Phone Number</p>
                    <PhoneInputComponent country_code={physician_info.country_code} phone_number={physician_info.phone_number} on_change={handle_change} />
                </span>

            </div>

            <div className="col-span-1 flex flex-col gap-5 bg-white p-5 rounded-md shadow-md ">
                <span className="flex flex-col gap-2 w-full">
                    <p className="text-sm font-medium text-slate-700 font-mont">Gender</p>
                    <select name="gender" id="gender" className="w-full h-[50px] border border-slate-400 px-2 bg-white text-sm rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]" value={physician_info.gender} onChange={handle_change}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </span>

                <InputComponent3 title="Country" type="text" name="country"  value={physician_info.country} onChange={handle_change}  />

                <InputComponent3 title="State" type="text" name="state"  value={physician_info.state} onChange={handle_change}  />

                <InputComponent3 title="Address" type="text" name="address"  value={physician_info.address} onChange={handle_change}  />
                

            </div>

            <div className="col-span-1 flex flex-col gap-5 bg-white p-5 rounded-md shadow-md ">    
                
                <span className="flex flex-col gap-2 w-full font-mont">
                    <p className="text-sm font-medium text-slate-700 font-mont">Registered As</p>
                    <select name="registered_as" id="registered_as" className="w-full h-[50px] border border-slate-400 px-2 bg-white text-sm rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]" value={physician_info.registered_as} onChange={handle_change}>
                        <option value="">Select</option>
                        <option value="Specialist">Specialist</option>
                        <option value="General Doctor">General Doctor</option>
                    </select>
                </span>
                
                <span className="flex flex-col gap-2 w-full font-mont">
                    <p className="text-sm font-medium text-slate-700 font-mont">Specialty</p>
                    <select name="specialty" id="specialty" className="w-full h-[50px] border border-slate-400 px-2 bg-white text-sm rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]" value={physician_info.specialty} onChange={handle_change}>
                        <option value="">Select Specialty</option>
                        {
                            doctors_specialties.map((item:string,ind:number)=>{
                                return(
                                    <option key={ind} value={item}>{item}</option>

                                )
                            })
                        }
                    </select>
                </span>

                <span className=" w-full flex flex-col gap-2">
                    <p className="text-sm font-medium text-slate-700 font-mont">Medical Licence</p>

                    <FileUploaderNew id={'medical_licence'} title={'Upload Medical Licence'} url={''} onFileUpload={handle_file_upload} />
                </span>
            </div>

            <div className="xl:col-start-3 w-full flex justify-end items-end ">
                <Button  className="w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-medium rounded text-md" onClick={handle_submit} >
                    {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Save Changes'}
                </Button>
            </div>


        </div>
    )
}

export default PhysicianProfileComponent