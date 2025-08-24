'use client'
import React, { useState, useEffect } from 'react'
import { transaction_history } from '@/constants'
import { format_date_from_unix } from '@/lib/date_formater'
import { Dot, Loader2Icon } from 'lucide-react'
import { AppointmentProps, AppointmentType } from '@/types'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogHeader, DialogFooter } from './ui/dialog'
import Image from 'next/image'
import { patch_auth_request } from '@/app/api'
import { toast_msg } from '@/lib/toast'
import { AxiosResponseHeaders } from 'axios'
import router from 'next/router'

interface TransactionHistoryProps {
    transaction_id: string
    transaction_type: string
    narration: string
    amount: number
    date: number
}

const ITEMS_PER_PAGE = 5

interface AppoinProp {
    fund_search: string
    setFund_search?: (fund_search: string) => void
    appointment_info: AppointmentProps;
    setAppointment_info: (appointment_info: AppointmentProps) => void;
    loading: boolean;
    setLoading: (loading: boolean)=> void;
    page_number: number;
    setPage_number: (page_number: number)=> void;


}

const AdminAppointmentSchedule = ({ fund_search, setFund_search,  appointment_info,  setAppointment_info, loading, setLoading, page_number, setPage_number }: AppoinProp) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selected_appointment_info, setSelected_appointment_info] = useState<AppointmentType | null>(null)
    const [loading_2, setLoading_2] = useState(false)

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

    async function handle_submit(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault()

        setLoading_2(true)

        if (!navigator.onLine) return toast_msg({title: 'Not connect to the internet!', type:'danger'})

        const { pathname } = new URL(location.pathname, window.location.origin);

        const uuid = pathname.split('/').pop();

        try{

            const res = await patch_auth_request(`auth/accept-appointment`, {appointment_id: selected_appointment_info?.appointment_id, status: 'accepted'}) as AxiosResponseHeaders

            console.log(res)

            if (res.status == 200 || res.status == 201){

                toast_msg({title: "Appoinment accepted"})

                setSelected_appointment_info(res.data.data)

                setLoading_2(false)

            }else if (res.status = 401){

                toast_msg({title: 'Session expired, kindly login!',  })

                router.push('/login')
            }else{

                toast_msg({title: res.response.data.msg, type:'danger'})

            }
            
        }catch(err){
            setLoading_2(false)
            console.log(err)
        }finally{
            setLoading_2(false)
        }

    }

    return (
        <div className="w-full  bg-white  pb-0  overflow-x-auto scrollbar-hidden font-mont">
        
            <div className="block min-w-[975px] pb-2 w-full overflow-x-auto bg-white">

                <div className="w-full  min-h-30 ">
                    <div className="w-full flex items-center justify-between border h-[55px] bg-white border-gray-200 ">

                        <div className="w-[22.5%] px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium">Appointment Date, Time</p>
                        </div>
                        <div className="w-[17.5%] px-3 sm:px-5 flex items-center justify-start h-full ">
                            <p className="text-[13px] font-medium">Patient Name</p>
                        </div>
                        <div className="w-[25%] px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium ">Complain</p>
                        </div>
                        <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium">Consultation Type</p>
                        </div>
                        <div className="w-[15%]  px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium">Status</p>
                        </div>
                    </div>

                    <div className="w-full bg-white  relative ">
                        
                            
                            
                            <>
                                {
                                    appointment_info.appointments.length == 0 ?

                                    <div className=" w-[calc(100%-39px)] mx-auto  flex h-[350px] rounded-lg bg-white p-5 items-center justify-center relative">
                                        <p className="text-[13px] text-gray-600 text-center py-2">{!loading && "No appointment created yet!"}</p>

                                        {loading && <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center ">
                                            <Loader2Icon className="h-10 w-10 animate-spin text-slate-400 z-10" />
                                        </div>}
                                    </div>
                                    :
                                    <div className="w-full min-h-[350px] flex flex-col relative">
                                        {loading && <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center ">
                                            <Loader2Icon className="h-10 w-10 animate-spin text-slate-400 z-10" />
                                        </div>}

                                        {appointment_info.appointments.map((data,ind:number)=>{
                                            const {time, patient, appointment_type, status, complain} = data

                                            const date = format_date_from_unix(Number(time));

                                            const text_color = status == 'pending' ? 'text-amber-500' : (status === 'missed' || status == 'cancelled') ? 'text-red-500' : status == 'completed' ? 'text-[#3062e9]' : 'text-green-500'

                                            const border_color = status == 'pending' ? 'border-amber-500' : (status === 'missed' || status == 'cancelled') ? 'border-red-500' : status == 'completed' ? 'border-[#3062e9]' : 'border-green-500'
                                            
                                            const bg_color = status == 'pending' ? 'bg-amber-500/5' : (status === 'missed' || status == 'cancelled') ? 'bg-red-500/5' : status == 'completed' ? 'bg-[#3062e9]/5' : 'bg-green-500/5'
                                            
                                            const ring_color = status == 'pending' ? 'ring-amber-500' : (status === 'missed' || status == 'cancelled') ? 'ring-red-200' : status == 'completed' ? 'ring-blue-200' : 'ring-green-200'

                                            const image = data.patient?.avatar || '/default-man.png'
                                            
                                            return(
                                                <div key={ind} className="w-full even:bg-gray-50 ">

                                                    <Dialog>
                                                        <DialogTrigger className='w-full'>
                                                            <div className="w-full flex items-center justify-between py-3  cursor-pointer" onClick={()=> setSelected_appointment_info(data)}>
                                                                <div className="w-[22.5%] px-3 sm:px-5 flex items-center justify-start">
                                                                    <p className="text-[13px] ">{date.date}, {date.time}</p>
                                                                </div>
                                                                <div className="w-[17.5%] px-3 sm:px-5 flex items-center justify-start">
                                                                    <p className="text-[13px] ">{patient.first_name} {patient.last_name}</p>
                                                                </div>
                                                                <div className="w-[25%] px-3 sm:px-5 flex items-center justify-start">
                                                                    <p className="text-[13px] w-full  line-clamp-1 text-start">
                                                                        {complain} 
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

                                                        <DialogContent  className='font-mont w-full md:w-[70vw]  px-0 font-mont max-lg:h-[90vh]  overflow-y-auto hide-scrollbar py-3 sm:py-4'>
                                                            <DialogHeader className='border-b border-gray-200 pb-3 px-3 sm:px-4'>
                                                                <DialogTitle className='text-[15.5px]' >Appointment Information</DialogTitle>
                                                                <DialogDescription className='text-[13px]'>{`${patient.first_name} ${patient.last_name} has booked a ${appointment_type.replace(/_/, ' ')} appointment with you scheduled for ${date.date}, ${date.time} `}</DialogDescription>
                                                            </DialogHeader>

                                                            <div className='w-full px-3 sm:px-4 grid  lg:grid-cols-2 gap-4 '>
                                                                <div className="col-span-1  relative gap-5 flex flex-col ">

                                                                    <div className={`w-full min-h-[350px] relative  rounded-md `}>

                                                                        <span className={`h-full w-full rounded-md `}>
                                                                            <Image src={image} alt='' layout='fill' objectFit='cover' className='rounded-md'  />
                                                                        </span>
                                                                    </div>

                                                                </div>

                                                                <div className="col-span-1 h-full flex flex-col justify-start gap-3 ">
                                                                    <span className="w-full flex gap-2">
                                                                        <p className="text-[13px] font-medium">Status:</p>
                                                                        <p className={` text-[13px] font-medium text-center ${text_color} `}>{selected_appointment_info && selected_appointment_info.status.toUpperCase() }</p>
                                                                    </span>
                                                                    <span className="w-full flex gap-2">
                                                                        <p className="text-[13px] font-medium">Patient Name:</p>
                                                                        <p className="text-[13px]">{selected_appointment_info && selected_appointment_info.patient.first_name} {selected_appointment_info && selected_appointment_info.patient.last_name}</p>
                                                                    </span>
                                                                    <span className="flex items-center justify-start gap-2">
                                                                        <p className="text-[13px] font-medium">Appointment Time:</p>
                                                                        <p className="text-[13px] ">{date.date} {date.time}</p>
                                                                    </span>
                                                                    <span className="flex items-center justify-start gap-2">
                                                                        <p className="text-[13px] font-medium">Appointment type:</p>
                                                                        <p className="text-[13px] ">{`${selected_appointment_info && selected_appointment_info.appointment_type.replace(/_/,' ')} appointment`}</p>
                                                                    </span>
                                                                    <span className="flex items-center justify-start gap-2">
                                                                        <p className="text-[13px] font-medium">Country:</p>
                                                                        <p className="text-[13px] ">{selected_appointment_info && selected_appointment_info.patient.country}</p>
                                                                    </span>
                                                                    <span className="flex items-center justify-start gap-2">
                                                                        <p className="text-[13px] font-medium">Gender:</p>
                                                                        <p className="text-[13px] ">{selected_appointment_info && selected_appointment_info.patient.gender}</p>
                                                                    </span>
                                                                    <span className="flex items-center justify-start gap-2">
                                                                        <p className="text-[13px] font-medium">Age:</p>
                                                                        <p className="text-[13px] ">{"35"}</p>
                                                                    </span>
                                                                    <span className="flex items-center justify-start gap-2">
                                                                        <p className="text-[13px] font-medium">Height (cm):</p>
                                                                        <p className="text-[13px] ">{selected_appointment_info && selected_appointment_info.patient.height}</p>
                                                                    </span>
                                                                    <span className="flex items-center justify-start gap-2">
                                                                        <p className="text-[13px] font-medium">Weight (kg):</p>
                                                                        <p className="text-[13px] ">{selected_appointment_info && selected_appointment_info.patient.weight}</p>
                                                                    </span>
                                                                    <span className="flex items-center justify-start gap-2">
                                                                        <p className="text-[13px] font-medium">Blood Group:</p>
                                                                        <p className="text-[13px] ">{selected_appointment_info && selected_appointment_info.patient.blood_group}</p>
                                                                    </span>
                                                                    <span className="flex items-center justify-start gap-2">
                                                                        <p className="text-[13px] font-medium">Genotype:</p>
                                                                        <p className="text-[13px] ">{selected_appointment_info && selected_appointment_info.patient.genotype}</p>
                                                                    </span>
                                                                    <span className="flex flex-col items-start justify-start gap-1">
                                                                        <p className="text-[13px] font-medium">Complaint:</p>
                                                                        <p className="text-[13px] ">{selected_appointment_info && selected_appointment_info.complain}</p>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                
                                                            <DialogFooter className='px-4  gap-2  border-t border-gray-200 pt-4' >
                                                                <DialogClose className="md:h-[45px] h-[40px] px-5 sm:px-7 rounded-sm bg-gray-200 text-gray-700 hover:bg-gray-200/80 duration-300 text-[13px]">Cancel</DialogClose>

                                                                {(selected_appointment_info && selected_appointment_info.status == 'pending') && <button className="text-[13px] md:h-[45px] h-[40px] w-[120px] sm:px-7 rounded-sm bg-[#306ce9] text-white hover:bg-[#306ce9]/90 duration-300 flex items-center justify-center" onClick={handle_submit} disabled={loading_2} >
                                                                    {loading_2 ? <Loader2Icon className={'animate-spin size-5'} /> : "Accept" }
                                                                </button>}
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

            
        </div>
    )
}

export default AdminAppointmentSchedule