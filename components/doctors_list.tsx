'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { doctors_specialties, registered_doctors } from '@/constants';
import Image from 'next/image';
import Link from 'next/link'
import { DropDownWithSearchBar } from './drop_down_component';
import { useChat } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';
import { toast_msg } from '@/lib/toast';
import { get_auth_request } from '@/app/api';
import { AxiosResponseHeaders } from 'axios';
import { HiFilter } from 'react-icons/hi';
import { IoCaretUp, IoCaretDown } from 'react-icons/io5';
import {  Loader2Icon, MessageSquare, VideoIcon } from 'lucide-react';
import {  Dialog,  DialogClose,  DialogContent,  DialogDescription,  DialogFooter,  DialogHeader,  DialogTitle,  DialogTrigger } from "@/components/ui/dialog"
import { Skeleton } from './ui/skeleton';
import { PhysicianInformationProps, PhysicianType } from '@/types';
import { PageHeader } from './reuseable_heading_component';

interface DoctorProps {
    first_name: string;
    last_name: string;
    description: string;
    country: string;
    registered_as: string;
    specialty: string;
    languages_spoken: string[];
    avatar: string;
    current_hospital_or_clinic: string;
    physician_id: string;
    gender?: string;
}

const DoctorsList = () => {
    const {selected_user, setSelected_user} = useChat()
    const [filter_doctor, setFilter_doctor] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [doctors_information, setDoctors_information] = useState<PhysicianInformationProps>({ physicians:[], total_number_of_pages:1, total_number_of_physicians:0})
    const [filtered_doctors_information, setFiltered_doctors_information] = useState<PhysicianType[]>([])
    const [open_drop_down, setOpen_drop_down] = useState(false)
    const [page_number, setPage_number] = useState(1)
    const [items_per_page, setItems_per_page] = useState(10)

    // Filter doctors based on specialty
    useEffect(() => {

        if (doctors_information.physicians){
            const new_list = doctors_information?.physicians.filter((item:PhysicianType)=>{
    
                return(
                    item.country.toLowerCase().includes(filter_doctor.toLowerCase())||
                    item.state.toLowerCase().includes(filter_doctor.toLowerCase())||
                    item.specialty.toLowerCase().includes(filter_doctor.toLowerCase())||
                    item.registered_as.toLowerCase().includes(filter_doctor.toLowerCase())||
                    item.languages_spoken.map((item:string) => item.toLowerCase()).includes(filter_doctor.toLowerCase())
                )
            })

            setFiltered_doctors_information(new_list)            
        }

    }, [doctors_information?.physicians, filter_doctor ])

    // Fetch doctors from server with pagination
    const fetch_doctors_from_server = useCallback(async (page_number: number, limit:number) => { 

        setLoading(true);
        
        try {
            const res = await get_auth_request(`auth/all-physicians/${page_number}/${limit}`) as AxiosResponseHeaders;
            
            if (res.status === 200 || res.status === 201) {

                setDoctors_information({...doctors_information, ...res.data?.data})

                setLoading(false)

            } else if (res.status === 401) {

                toast_msg({ title: 'Session has expired, kindly login again' });

                router.push('/login');

            } else if (res.status === 500) {

                toast_msg({ title: 'Network error, kindly refresh your page.', type: 'danger' });

                setTimeout(() => {
                    
                    router.refresh();

                }, 2000);

            } else {

                const error_msg = `${res.response?.data?.msg || 'An error occurred while fetching doctors.'}`;

                toast_msg({ title: error_msg, type: 'danger' });
            }
        } catch (error) {
            console.log('Fetch Error:', error);
        } finally {
            setLoading(false)
        }
    }, [ router]);

    // Initial fetch on mount
    useEffect(() => {

        fetch_doctors_from_server(page_number, items_per_page);

    }, []);

    async function app_projects_action(item: string | number) {
        
        let new_page_number = page_number;
        const max_page_number = doctors_information?.total_number_of_pages

        if (item === 'prev') {
            if (page_number > 1) {
                new_page_number = page_number - 1;          
            }
        } else if (item === 'next') {
            if (max_page_number && page_number < max_page_number) {
                new_page_number = page_number + 1;
            }
        } else {
            new_page_number = Number(item);
        }

        setLoading(true)

        fetch_doctors_from_server(new_page_number, items_per_page)
        setPage_number(new_page_number)

    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = doctors_information?.total_number_of_pages ?? 1;
        const max_displayed_pages = 3;


        if (max_page_number <= max_displayed_pages) {
            for (let i = 1; i <= max_page_number; i++) {
                pages.push(
                <p key={i} className={`text-[15.5px] font-light h-[27px] w-[27.5px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                    page_number === i ? 'bg-gray-200 text-gray-600' : ''
                    }`}
                    onClick={() => app_projects_action(i)}
                >
                    {i}
                </p>
                );
            }
        } else {
            let startPage = Math.max(1, page_number - 1);
            let endPage = Math.min(page_number + 1, max_page_number);

            if (page_number === 1) {
                startPage = 1;
                endPage = max_displayed_pages;
            } else if (page_number === max_page_number) {
                startPage = max_page_number - 2;
                endPage = max_page_number;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                <p
                    key={i}
                    className={`text-[13px] font-light h-[27px] w-[27.5px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                    page_number === i ? 'bg-blue-700 text-white' : ''
                    }`}
                    onClick={() => app_projects_action(i)}
                >
                    {i}
                </p>
                );
            }
        }

        return pages;
    }; 



    return (
        <div className="w-full flex flex-col gap-4  rounded-md">
            <span className="w-full flex max-sm:flex-col gap-3  justify-between items-start sm:items-center px-5">
                <PageHeader text={'All Physicians'} />

                <div className=" w-full sm:w-[300px]  rounded-[4px] relative ">
                    <span className="h-[50px] w-full flex items-center justify-start gap-1 px-5 border border-gray-300 bg-white rounded-md" onClick={()=> setOpen_drop_down(!open_drop_down)}>
                        <p className="text-[13px] ">Filter</p>
                    </span>

                    <div className={`w-full flex flex-col p-3 absolute ${open_drop_down ? "block": "hidden"} right-0 top-[45px] duration-200 ease-in-out rounded-[4px] bg-white border border-gray-200 shadow-md gap-5 z-10`}>

                        <span className="w-full flex flex-col gap-2">
                            <p className="text-[13px]">Registered as</p>

                            <select name="filter_appointment" id="filter_appointment" className='h-[45px] bg-white border border-gray-300 rounded-[4px] px-3 text-[13px]' onChange={(e)=> setFilter_doctor(e.target.value)}>
                                <option value="" className='text-[13px]'>Select Time</option>
                                <option value="Specialist" className='text-[13px]'>A Specilist</option>
                                <option value="General Doctor" className='text-[13px]'>A General Doctor</option>
                            </select>
                        </span>

                        <span className="w-full flex flex-col gap-2">
                            <p className="text-[13px]">Specialist Specialty</p>

                                <div className="xl:w-[230px] w-full">
                                <DropDownWithSearchBar
                                    dropArray={doctors_specialties}
                                    selected_item={filter_doctor}
                                    setSelected_item={setFilter_doctor}
                                />
                            </div>
                        </span>

                        <span className="w-full flex flex-col gap-2">
                            <p className="text-[13px]">Consultation Type</p>

                            <select name="filter_appointment" id="filter_appointment" className='h-[45px] bg-white border border-gray-300 rounded-[4px] px-3 text-[13px]' onChange={(e)=> setFilter_doctor(e.target.value)}>
                                <option value="" className='text-[13px]'>Select status</option>
                                <option value="chat" className='text-[13px]'>Chat</option>
                                <option value="video_call" className='text-[13px]'>Video</option>
                            </select>
                        </span>


                        <span className="h-[45px] w-full">
                            <input type="text" name="filter_appoitnment" placeholder='Enter doctor name ...' onChange={(e)=> setFilter_doctor(e.target.value)} className='input-type text-[13px]' />
                        </span>

                        <button className="w-full h-[45px] mt-2 text-[13px] cursor-pointer border border-gray-400 hover:bg-gray-100 duration-300  rounded-[4px]" onClick={()=> {setFilter_doctor(''); setOpen_drop_down(false)}}>Clear Filter</button>


                    </div>
                </div>
            </span>
            

            <div className="w-full px-5 max-h-[90vh] sm:max-h-[800px] overflow-y-auto scrollbar-hidden py-2 max-sm:-mt-2 -mt-1 hide-scrollbar">
                <>
                    
                    {
                        !filtered_doctors_information.length ? (
                        <div className=" w-full flex h-[calc(100vh-250px)] relative rounded-lg  p-5 items-center justify-center">
                            <p className="text-[13px] text-gray-600 text-center py-2">{!loading && "No doctors found with the selected criteria"}</p>

                            {loading && 
                                <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                                    <Loader2Icon className='size-8 animate-spin text-gray-500' />
                                </div> }
                        </div>
                        ) : (
                        <div className=" w-full flex flex-col gap-3 relative">
                            <div className="w-full temp-230 gap-4 min-h-[calc(100vh-250px)] relative">
                                {loading && 
                                <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                                    <Loader2Icon className='size-8 animate-spin text-gray-500' />
                                </div> }

                                {filtered_doctors_information
                                    .map((data: PhysicianType, ind: number) => {
                                    const { first_name, last_name, registered_as,specialty, languages_spoken, avatar, physician_id, gender = 'Not specified' } = data;

                                    const job_title = registered_as == 'Specialist' ? specialty : 'General Doctor'
        
                                    return (
                                        <div key={ind} className="w-full " >
                                            <Dialog>
                                                <DialogTrigger className='w-full'>
                                                    <div className={`bg-white max-w-[550px] ease-in-out duration-150 w-full flex flex-col font-mont rounded-lg box-shadow-1 shadow-md hover:bg-[#306ce9] group`} onClick={()=> setSelected_user(data)}>
                                                        <div className="w-full min-h-[240px] flex flex-col items-center gap-7 p-3 sm:p-5">
                                                            <span className="relative overflow-hidden rounded-full h-17 w-17 mt-2">
                                                                <Image src={avatar || '/profile-img-2c.jpg'} alt="" fill className="object-cover" />
                                                            </span>
                                                            <div className="w-full flex flex-col items-center gap-2 md:gap-3">
                                                                <p className="text-[13px] font-medium text-gray-700 group-hover:text-white">Dr {last_name} {first_name}</p>
                                                                <p className="text-[12.5px] line-clamp-1 text-gray-700 group-hover:text-white text-center w-[85%] mx-auto">{job_title}</p>
                                                                <span className="w-[90%] flex items-center justify-center gap-2">
                                                                {languages_spoken.map((item: string, ind: number) => (
                                                                    <p key={ind} className="text-[12.5px] text-gray-700 group-hover:text-white">{item}</p>
                                                                ))}
                                                                </span>
                                                            </div>
                                                        </div>
        
                                                        <span className="h-[50px] w-full flex items-center gap-3 border-t group-hover:text-white group-hover:border-blue-400 duration-150 border-gray-200">
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
                                                </DialogTrigger>
        
                                                <DialogContent className='font-mont w-full md:w-[70vw] lg:w-[80vw] px-0 font-mont  max-md:h-[90vh] max-lg:h-[80vh] overflow-y-auto hide-scrollbar'>
                                                    <DialogHeader className='border-b border-gray-200 pb-3 px-5'>
                                                        <DialogTitle className='text-[15.5px]'>{"Doctor's Information"}</DialogTitle>
                                                        <DialogDescription className='text-[13px]'> {selected_user && selected_user.specialty} </DialogDescription>
                                                    </DialogHeader>
        
                                                    <div className="w-full px-5 grid  lg:grid-cols-2 gap-5">
                                                        <div className="col-span-1  min-h-[400px] relative ">
                                                            <span className="h-full w-full">
                                                                <Image src={(selected_user && selected_user.avatar) || '/default-male.png'} alt='' fill objectFit='cover' className='rounded-md' />
                                                            </span>
                                                        </div>
                                                        <div className="col-span-1 h-full flex flex-col justify-between gap-3 ">
                                                            <div className="w-full flex flex-col gap-3">
                                                                <span className="w-full flex gap-2">
                                                                    <p className="text-[13px] font-medium">Name:</p>
                                                                    <p className="text-[14px]">{selected_user && `${selected_user?.first_name} ${selected_user?.last_name}` }</p>
                                                                </span>
                                                                <span className="w-full flex gap-2">
                                                                    <p className="text-[13px] font-medium">Gender:</p>
                                                                    <p className="text-[14px]">{ selected_user && selected_user.gender }</p>
                                                                </span>
                                                                <span className="w-full flex gap-2">
                                                                    <p className="text-[13px] font-medium">Registered As:</p>
                                                                    <p className="text-[14px]">{selected_user && selected_user.registered_as }</p>
                                                                </span>
                                                                <span className="w-full flex gap-2">
                                                                    <p className="text-[13px] font-medium">Specialty:</p>
                                                                    <p className="text-[14px]">{selected_user && selected_user.specialty }</p>
                                                                </span>
                                                                <span className="w-full flex gap-2">
                                                                    <p className="text-[13px] font-medium">Country:</p>
                                                                    <p className="text-[14px]">{selected_user && selected_user.country }</p>
                                                                </span>
                                                                <span className="w-full flex gap-2">
                                                                    <p className="text-[13px] font-medium">Languages:</p>
                                                                    {
                                                                        selected_user?.languages_spoken && selected_user.languages_spoken.map((data, ind:number)=>{
                                                                            return(
                                                                                <p key={ind} className="text-[14px]">{data},</p>
                                                                            )
                                                                        })
                                                                    }
                                                                </span>
                                                                
                                                                <span className="w-full flex flex-col gap-2">
                                                                    <p className="text-[13px] font-medium">Bio:</p>
                                                                    <p className="text-[13px] leading-[25px]">{selected_user && selected_user.bio}</p>
                                                                </span>
                                                            </div>
        
                                                            <div className="w-full flex items-center justify-end gap-1">
                                                                <DialogClose className="px-7 rounded-sm text-gray-700 bg-gray-200 hover:bg-gray-200/70 duration-300 h-[45px] text-[13px]">Cancel</DialogClose>
                                                                <Link href={`/doctors/appointment-booking/${selected_user && selected_user?.physician_id}`} className="px-7 rounded-sm text-white bg-[#306ce9] hover:bg-[#306ce9]/90 duration-300 h-[45px] flex items-center justify-center text-[13px]">Proceed</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
        
        
        
                                            </Dialog>
                                                                
                                            
                                        </div>
                                    );
                                    })}
                            </div>
                        </div>
                        )
                    }

                </>
            </div>

            {/* Pagination Controls */}
                <div className="w-full flex items-center justify-between px-5 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className={`text-[13px] cursor-pointer ${page_number == 1 ? "text-gray-400 cursor-not-allowed":'text-gray-700 cursor-pointer'}`} onClick={() => app_projects_action('prev')}>Prev</p>

                            <span className="w-auto h-full flex flex-row items-center justify-start">
                                {render_page_numbers()}
                            </span>

                            <p className={`text-[13px] ${page_number == doctors_information?.total_number_of_pages ? "text-gray-400 cursor-not-allowed ":'text-gray-700 cursor-pointer'}`} onClick={() => app_projects_action('next')}>Next</p>
                        </span>
                        
                    </div>

                    <p className="text-[13px]">
                        Page {page_number} of {doctors_information?.total_number_of_pages}
                    </p>
                </div>
        </div>
    );
};

export default DoctorsList;