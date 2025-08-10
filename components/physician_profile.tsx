'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { InputComponent3 } from '@/components/auth_components/input_component';
import PhoneInputComponent from '@/components/auth_components/phone_input_component';
import {doctors_specialties, languages} from '@/constants'
import { Loader2Icon } from 'lucide-react';
import { Button } from 'react-day-picker';
import { toast_msg } from '@/lib/toast';
import { FileUploaderNew, ImgUploader} from '@/lib/file_uploader'
import { CiEdit } from "react-icons/ci";
import { useChat } from '@/app/context/ChatContext';
import { patch_auth_request } from '@/app/api';
import { AxiosResponseHeaders } from 'axios';
import { useRouter } from 'next/navigation';
import DateOfBirth from './auth_components/date_of_birth';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import { IoCheckmark, IoCloseCircleOutline } from 'react-icons/io5';

interface PhysicianFormInfoProps {
    first_name?: string;
    last_name?: string;
    avatar?: string;
    gender?: string;
    country_code?: string;
    phone_number?: string;
    country?: string;
    state?: string;
    address?: string;
    registered_as?: string;
    specialty?: string;
    medical_license?:string;
    date_of_birth?:number;
    bio?:string;
    languages_spoken?:string[];

}



const PhysicianProfileComponent = () => {
    const router = useRouter()
    const [position, setPosition] = React.useState("bottom")
    const { user_information, country_dial_code, setCountry_dial_code, setUser_information} = useChat()
    const [loading, setLoading] = useState(false)
    const [physician_info, setPhysician_info] = useState<PhysicianFormInfoProps>({first_name:"", last_name:"", avatar:'',gender:'',country_code:'',phone_number:'', country:'', address: '', registered_as:'',specialty:'', state:'', medical_license:'', date_of_birth:0, languages_spoken: ['English'], bio: ''})

    useEffect(() => {
        setPhysician_info({...physician_info, country_code:country_dial_code})
    }, [country_dial_code])

    useEffect(() => {
        setPhysician_info({...physician_info, date_of_birth: Number(user_information?.date_of_birth) || Math.floor(Date.now() / 1000)}) 
    }, [user_information?.date_of_birth])

    useEffect(() => {
                
        if (user_information) {
            
            const {first_name, last_name, gender, date_of_birth, country, address, avatar, state, registered_as, specialty, phone_number, country_code, city, languages_spoken, medical_license, bio } = user_information
            
            setTimeout(() => {
                setPhysician_info({first_name, last_name, avatar, gender, country_code, phone_number, country, address, registered_as, specialty, state, medical_license, languages_spoken: !languages_spoken?.length ? ['English']: languages_spoken , date_of_birth, bio })
            }, 100);
        }
    }, [])

    const handle_change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >) => {
        const { name, value } = e.target;
        setPhysician_info({ ...physician_info, [name]: value });
    };

    const handle_submit = async(e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true)

        if (!navigator.onLine) return  toast_msg({title:'Not connect to the internet!'})

        try {
            
            const res = await patch_auth_request(`auth/edit-physician-data`, physician_info) as AxiosResponseHeaders

            if (res.status == 200 || res.status == 201) {
                
                setLoading(false)

                toast_msg({title: "Profile updated successfully"})

                setUser_information({...user_information, ...res.data.user})

            }else if(res.status == 401){

                toast_msg({title: 'Session expired, please login!'})

                setTimeout(() => {
                    router.push('/login')
                }, 2000);

            }else{
                toast_msg({title: res.response.data.msg || 'Error updating physician profile', type:'danger'})
            } 

        } catch (err) {
            
            console.log('err')

        }finally{
            setLoading(false)
        }


    };

    function handle_file_upload(file:string, id?:string) {
        setPhysician_info({...physician_info, [id!]:file})
    }

    function handle_language(item: string) {

        console.log('clicked ', item)

        if(item == 'English' && physician_info.languages_spoken?.includes('English')) return;

        
        setPhysician_info((prev) => {
            
            const languages_spoken = prev.languages_spoken || [];
            
            let updatedLanguages;
            
            
            if (languages_spoken.includes(item)) {
                
                updatedLanguages = languages_spoken.filter((lang) => lang !== item);
                
            } else {
                if (languages_spoken.length == 3){

                    toast_msg({title: 'Maximum of 3 languages!'})

                    updatedLanguages = languages_spoken

                }else{

                    updatedLanguages = [...languages_spoken, item];

                }


            }

            return {  ...prev, languages_spoken: updatedLanguages, };
        });
    }

    return (
        <div className="w-full h-full">

            {user_information ?  
                <div className="w-full h-full gap-5 font-mont grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 ">
                    {/* the first column */}
                    <div className="col-span-1 flex flex-col justify-between gap-5 bg-white p-5 rounded-md shadow-md  ">
                        <span className="h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] lg:w-[320px] lg:h-[320px] flex mx-auto justify-center relative group ring-5 ring-blue-200 rounded-full mt-3">
                            <ImgUploader id={'avatar'} title={''} url={user_information?.avatar || ''} onFileUpload={handle_file_upload} />

                            
                        </span>

                        <div className="w-full flex flex-col gap-5">

                            <InputComponent3 title="First Name" type="text" name="first_name"  value={physician_info.first_name!} onChange={handle_change}  />

                            <InputComponent3 title="Last Name" type="text" name="last_name"  value={physician_info.last_name!} onChange={handle_change}  />

                            <span className="flex flex-col gap-2 w-full">
                                <p className="text-[13px] font-medium text-slate-700 font-mont">Phone Number</p>
                                <PhoneInputComponent country_code={physician_info.country_code!} phone_number={physician_info.phone_number!} on_change={handle_change} />
                            </span>

                            <span className="flex flex-col items-start justify-start gap-2 w-full">
                                <p className="text-[13px] font-medium font-mont">Date of Birth</p>

                                <DateOfBirth />
                            </span>
                        </div>
                    </div>

                    <div className="col-span-1 flex flex-col gap-5 bg-white p-5 rounded-md shadow-md ">
                        <span className="flex flex-col gap-2 w-full">
                            <p className="text-[13px] font-medium text-slate-700 font-mont">Gender</p>
                            <select name="gender" id="gender" className="w-full h-[50px] border border-slate-400 px-2 bg-white text-[13px] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]" value={physician_info.gender} onChange={handle_change}>
                                <option value="" className='text-[13px] font-mont' >Select Gender</option>
                                <option value="male" className='text-[13px] font-mont' >Male</option>
                                <option value="female" className='text-[13px] font-mont' >Female</option>
                                <option value="other" className='text-[13px] font-mont' >Other</option>
                            </select>
                        </span>

                        <InputComponent3 title="Country" type="text" name="country"  value={physician_info.country!} onChange={handle_change}  />

                        <InputComponent3 title="State" type="text" name="state"  value={physician_info.state!} onChange={handle_change}  />

                        <InputComponent3 title="Address" type="text" name="address"  value={physician_info.address!} onChange={handle_change}  />

                        <span className="flex flex-col gap-2 w-full">
                            <p className="text-[13px] font-medium text-slate-700">Languages</p>


                            <span className="w-full flex items-start justify-between gap-5">
                                {<span className="min-h-[50px] max-h-[100px] flex-1 rounded-[3px] border border-slate-400 p-2 overflow-y-auto  hide-scrollbar flex flex-wrap gap-3">
                                        {
                                            physician_info.languages_spoken && physician_info?.languages_spoken.map((item,ind)=>{
                                                return(
                                                    <span key={ind} className="h-[30px] px-3 flex items-center justify-center gap-1 bg-gray-100 border border-gray-200 rounded-full">
                                                        <IoCloseCircleOutline className={'size-[16px] cursor-pointer text-gray-700 hover:text-red-500 duration-300 '} onClick={()=> handle_language(item)} />
                                                        <p className="text-[12px] font-mont">{item}</p>
                                                    </span>
                                                )
                                            })
                                        }
                                    </span>}
                                
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild>
                                        <button className="h-[50px] w-[100px] text-[13px] rounded-[3px] border border-gray-400 duration-300 hover:bg-gray-100">Select</button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-80 bg-white py-3 rounded-md shadow-md flex flex-col gap-3">
                                        <DropdownMenuLabel className='text-[13px] font-medium text-gray-700 px-3.5'>Languages Spoken</DropdownMenuLabel>
                                        <DropdownMenuSeparator className='border-t border-gray-200' />

                                        <div className="w-ful flex flex-col ">
                                            {
                                                languages.map((item,ind)=>{
                                                    return(
                                                        <span key={ind} className="flex items-center justify-between h-[40px] px-3.5 hover:bg-gray-100 duration-150" onClick={()=> handle_language(item)} >
                                                            <p className="text-[13px]">{item}</p>
                                                            
                                                            {physician_info.languages_spoken?.includes(item) && <IoCheckmark className='size-[16px] text-gray-500 ' />}
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                        
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </span>
                        </span>

                        <span className="flex flex-col gap-2 w-full">
                            <p className="text-[13px] font-medium text-slate-700">Bio</p>

                            <textarea name="bio" id="text-area" className='textarea-type-1 h-[194px]' onChange={handle_change} value={physician_info.bio}></textarea>
                        </span>

                        

                    </div>

                    <div className="col-span-1 flex flex-col gap-5 bg-white p-5 rounded-md shadow-md ">    
                        
                        <span className="flex flex-col gap-2 w-full font-mont">
                            <p className="text-[13px] font-medium text-slate-700 font-mont">Registered As</p>
                            <select name="registered_as" id="registered_as" className="w-full h-[50px] border border-slate-400 px-2 bg-white text-[13px] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]" value={physician_info.registered_as} onChange={handle_change}>
                                <option value="" className='font-mont text-[12px]' >Select</option>
                                <option value="Specialist" className='font-mont text-[12px]' >Specialist</option>
                                <option value="General Doctor" className='font-mont text-[12px]' >General Doctor</option>
                            </select>
                        </span>
                        
                        <span className="flex flex-col gap-2 w-full font-mont">
                            <p className="text-[13px] font-medium text-slate-700 font-mont">Specialty</p>
                            <select name="specialty" id="specialty" className={`w-full h-[50px] ${physician_info.registered_as == 'General Doctor' ? "border-slate-200":"border-slate-400" } border px-2 bg-white text-[13px] rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#306ce9]`} value={physician_info.specialty} onChange={handle_change} disabled={physician_info.registered_as == 'General Doctor'} >
                                <option value="" className='text-[13px]' >Select Specialty</option>
                                {
                                    doctors_specialties.map((item:string,ind:number)=>{
                                        return(
                                            <option key={ind} value={item} className='text-[13px]'>{item}</option>

                                        )
                                    })
                                }
                            </select>
                        </span>

                        <span className=" w-full flex flex-col gap-2">
                            <p className="text-[13px] font-medium text-slate-700 font-mont">Medical Licence</p>

                            <FileUploaderNew id={'medical_license'} title={'Upload Medical Licence'} url={physician_info?.medical_license || ''} onFileUpload={handle_file_upload} />
                        </span>
                    </div>

                    <div className="3xl:col-start-3 w-full flex justify-end items-end ">
                        <Button  className="w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-medium rounded text-[13px] flex items-center justify-center" onClick={handle_submit} >
                            {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Save Changes'}
                        </Button>
                    </div>


                </div>
                :
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-[15.5px] font-medium font-mont max-w-[80%] text-center">Please make sure you are connected to the internet and refresh.</p>
                </div>
            }
        </div>
    )
}

export default PhysicianProfileComponent