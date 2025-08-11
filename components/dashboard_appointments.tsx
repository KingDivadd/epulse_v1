'use client'
import { consultation_card_list } from '@/constants'
import { format_date_from_unix } from '@/lib/date_formater';
import { AppointmentProps, AppointmentType } from '@/types'
import { Dialog, DialogClose, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { DialogContent, DialogFooter, DialogHeader } from './ui/dialog';
import Image from 'next/image';
import { useChat } from '@/app/context/ChatContext';

interface PassedAppointmentProps { 
    
    appointment_info: AppointmentProps;
    setAppointment_info: (appointment_info: AppointmentProps) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    page_number:number;
    setPage_number: (page_number:number)=> void;
    
}

const DashboardAppointment = ({ appointment_info, loading, setLoading, page_number, setPage_number }:PassedAppointmentProps) => {
    const [selected_appointment_info, setSelected_appointment_info] = useState<AppointmentType | null>(null)
    const [loading_2, setLoading_2] = useState(false)
    const {user_information} = useChat()


    async function app_projects_action(item: string | number) {
        
        let new_page_number = page_number;
        const max_page_number = appointment_info?.total_number_of_pages

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

        setPage_number(new_page_number)

    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = appointment_info?.total_number_of_pages ;
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

    async function handle_submit(e:React.FormEvent) {
        e.preventDefault();
    }

    return (
        <div className="w-full  bg-white rounded-md shadow-md p-5 pb- flex flex-col gap-5 font-mont overflow-hidden">
            <p className="text-[15.5px] font-medium">Recent Appointments</p>

            <div className="hidden md:block  w-full overflow-x-auto">

                <div className="min-w-[975px]  min-h-30">
                    <div className="w-full flex items-center justify-between border h-[55px] bg-white border-gray-200 ">

                        <div className="w-[27.5%] px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium">Appointment Date, Time</p>
                        </div>
                        <div className="w-[17.5%] px-3 sm:px-5 flex items-center justify-start h-full ">
                            <p className="text-[13px] font-medium">Dr. Name</p>
                        </div>
                        <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium ">Sepcialty</p>
                        </div>
                        <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium">Consultation Type</p>
                        </div>
                        <div className="w-[15%]  px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium">Status</p>
                        </div>
                    </div>

                    <div className="w-full bg-white pb-5 relative ">
                        
                            
                            
                            <>
                                {
                                    appointment_info.appointments.length == 0 ?

                                    <div className=" w-[calc(100%-39px)] mx-auto  flex h-[440px] rounded-lg bg-white p-5 items-center justify-center relative">
                                        <p className="text-[13px] text-gray-600 text-center py-2">{!loading && "No appointment created yet!"}</p>

                                        {loading && <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center ">
                                            <Loader2Icon className="h-10 w-10 animate-spin text-slate-400 z-10" />
                                        </div>}
                                    </div>
                                    :
                                    <div className="w-full flex flex-col relative">
                                        {loading && <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center ">
                                            <Loader2Icon className="h-10 w-10 animate-spin text-slate-400 z-10" />
                                        </div>}

                                        {appointment_info.appointments.map((data,ind:number)=>{
                                            const {time, physician, appointment_type, status} = data

                                            const {first_name, last_name, registered_as, gender, bio, specialty, languages_spoken, country} = physician

                                            const date = format_date_from_unix(Number(time));

                                            const text_color = status == 'pending' ? 'text-amber-500' : (status === 'missed' || status == 'cancelled') ? 'text-red-500' : status == 'completed' ? 'text-[#3062e9]' : 'text-green-500'

                                            const border_color = status == 'pending' ? 'border-amber-500' : (status === 'missed' || status == 'cancelled') ? 'border-red-500' : status == 'completed' ? 'border-[#3062e9]' : 'border-green-500'
                                            
                                            const bg_color = status == 'pending' ? 'bg-amber-500/5' : (status === 'missed' || status == 'cancelled') ? 'bg-red-500/5' : status == 'completed' ? 'bg-[#3062e9]/5' : 'bg-green-500/5'
                                            
                                            const ring_color = status == 'pending' ? 'ring-amber-500' : (status === 'missed' || status == 'cancelled') ? 'ring-red-200' : status == 'completed' ? 'ring-blue-200' : 'ring-green-200'

                                            const image = data.physician?.avatar || '/default-man.png'
                                            
                                            return(
                                                <div key={ind} className="w-full even:bg-gray-50 ">

                                                    <Dialog>
                                                        <DialogTrigger className='w-full'>
                                                            <div className="w-full flex items-center justify-between py-3 even:bg-gray-50 cursor-pointer" onClick={()=> setSelected_appointment_info(data)}>
                                                                <div className="w-[27.5%] px-3 sm:px-5 flex items-center justify-start">
                                                                    <p className="text-[13px] ">{date.date}, {date.time}</p>
                                                                </div>
                                                                <div className="w-[17.5%] px-3 sm:px-5 flex items-center justify-start">
                                                                    <p className="text-[13px] ">{physician.first_name} {physician.last_name}</p>
                                                                </div>
                                                                <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                                                                    <p className="text-[13px] ">
                                                                        {physician?.specialty ? physician?.specialty : 'General Doctor' } 
                                                                    </p>
                                                                </div>
                                                                <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                                                                    <p className="text-[13px] ">{appointment_type == 'chat' ? "Chat": "Video Call"}</p>
                                                                </div>
                                                                <div className="w-[15%] px-3 sm:px-5 flex items-center justify-start">
                                                                    <span className={`h-[30px] text-[13px] px-5 rounded-full flex items-center justify-center border ${border_color} ${bg_color} ${text_color}`}>{status}</span>
                                                                </div>
                                                            </div>

                                                        </DialogTrigger>
                                                        <DialogContent  className='font-mont w-[500px] md:w-[700px] lg:w-[900px] px-0'>
                                                            <DialogHeader className='border-b border-gray-200 pb-3 px-4'>
                                                                <DialogTitle className='text-[15.5px] font-semibold' >Appointment Information</DialogTitle>
                                                                <DialogDescription className='text-[13px]'>{`You've booked a ${appointment_type.replace(/_/, ' ')} appointment with Dr ${first_name} ${last_name} scheduled for ${date.date}, ${date.time} `}</DialogDescription>
                                                            </DialogHeader>

                                                            <div className='px-4 w-full grid grid-cols-2 gap-5 lg:gap-0 max-h-[65vh]  overflow-y-auto mt-2'>
                                                                <div className="col-span-2 md:col-span-1 flex flex-col gap-5  h-full max-md:border-b border-gray-200 max-md:pb-5">
                                                                    <p className={`text-[12px] font-medium w-full text-center ${text_color} `}>{selected_appointment_info && selected_appointment_info.status.toUpperCase() }</p>
                                                                    
                                                                    <span className={`lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[300px] h-[300px]  relative overflow-hidden rounded-full mx-auto ring-5 ${ring_color}`}>
                                                                        <Image src={image} alt='' layout='fill' objectFit='cover' />
                                                                    </span>


                                                                    <p className="text-[13px] font-medium  text-center text-gray-700 ">{selected_appointment_info && selected_appointment_info.physician.first_name} {selected_appointment_info && selected_appointment_info.physician.last_name}</p>

                                                                </div>

                                                                <div className="col-span-2 md:col-span-1 flex flex-col gap-4  h-full  ">
                                                                    <span className="w-full flex gap-2">
                                                                        <p className="text-[13px] font-medium">Name:</p>
                                                                        <p className="text-[13px]">{first_name} {last_name}</p>
                                                                    </span>
                                                                    <span className="w-full flex gap-2">
                                                                        <p className="text-[13px] font-medium">Gender:</p>
                                                                        <p className="text-[13px]">{ gender }</p>
                                                                    </span>
                                                                    <span className="w-full flex gap-2">
                                                                        <p className="text-[13px] font-medium">Registered As:</p>
                                                                        <p className="text-[13px]">{registered_as }</p>
                                                                    </span>
                                                                    <span className="w-full flex gap-2">
                                                                        <p className="text-[13px] font-medium">Specialty:</p>
                                                                        <p className="text-[13px]">{specialty }</p>
                                                                    </span>
                                                                    <span className="w-full flex gap-2">
                                                                        <p className="text-[13px] font-medium">Country:</p>
                                                                        <p className="text-[13px]">{country }</p>
                                                                    </span>
                                                                    <span className="w-full flex gap-2">
                                                                        <p className="text-[13px] font-medium">Languages:</p>
                                                                        {
                                                                            languages_spoken?.map((data, ind:number)=>{
                                                                                return(
                                                                                    <p key={ind} className="text-[13px]">{data},</p>
                                                                                )
                                                                            })
                                                                        }
                                                                    </span>
                                                                    
                                                                    <span className="w-full flex flex-col gap-2">
                                                                        <p className="text-[13px] font-medium">Bio:</p>
                                                                        <p className="text-[13px] leading-[25px]">{bio}</p>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                
                                                            <DialogFooter className='px-4  gap-2  border-t border-gray-200 pt-5' >
                                                                <DialogClose className="text-sm md:h-[45px] h-[40px] px-5 sm:px-7 rounded-sm bg-gray-200 text-gray-700 hover:bg-gray-200/80 duration-300">Cancel</DialogClose>

                                                                {user_information?.role == 'physician' && <>

                                                                    {(selected_appointment_info && selected_appointment_info.status == 'pending') && <button className="text-sm md:h-[45px] h-[40px] w-[120px] sm:px-7 rounded-sm bg-[#306ce9] text-white hover:bg-[#306ce9]/90 duration-300 flex items-center justify-center" onClick={handle_submit} disabled={loading_2} >
                                                                        {loading_2 ? <Loader2Icon className={'animate-spin size-8'} /> : "Accept" }
                                                                    </button>}
                                                                </>}
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                            </>
                        
                    </div>

                    {/* Pagination */}
                    <div className="w-full flex items-center justify-between px-5 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                            <span className="flex flex-row items-center justify-start gap-3 h-full">
                                <p className={`text-[13px] cursor-pointer ${page_number == 1 ? "text-gray-400 cursor-not-allowed":'text-gray-700 cursor-pointer'}`} onClick={() => app_projects_action('prev')}>Prev</p>

                                <span className="w-auto h-full flex flex-row items-center justify-start">
                                    {render_page_numbers()}
                                </span>

                                <p className={`text-[13px] ${page_number == appointment_info?.total_number_of_pages ? "text-gray-400 cursor-not-allowed ":'text-gray-700 cursor-pointer'}`} onClick={() => app_projects_action('next')}>Next</p>
                            </span>
                            
                        </div>

                        <p className="text-[13px]">
                            Page {page_number} of {appointment_info?.total_number_of_pages}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full  flex flex-col md:hidden gap-0">
                {
                    [1,2,3,4,5].map((data,ind:number)=>{
                        return(
                            <div key={ind} className="w-full flex items-center justify-between border-b border-gray-100 last:border-0 min-h-20 py-2">
                                <div className="flex-1 h-full gap-2 flex flex-col items-start justify-between ">
                                    <p className="w-full text-[13px] font-medium  ">{"Dr. Sophia Wong"}</p>
                                    <p className="w-full text-[14px] text-gray-600 line-clamp-2 ">{"Physical Medicine and Rehabilitation"}</p>
                                </div>

                                <div className="max-w-36 h-full gap-2 flex flex-col items-end justify-between line-clamp-2 ">
                                    <p className="text-[13px] w-full text-end">{"22nd of September, 4:40am"}</p>
                                    {ind%2==1? <p className="text-[14px] text-green-500 " >approved</p>:<p className="text-[12px] text-amber-500 " >pending</p>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default DashboardAppointment