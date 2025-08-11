'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { format_date_from_unix, is_within_24hrs } from '@/lib/date_formater';
import Image from 'next/image';
import {  VideoIcon, MessageSquare, MessageSquareDot, ChevronDown} from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, } from '@/components/ui/dropdown-menu';
import {metrics, physician_appointment_sample} from "@/constants"
import { HiFilter } from "react-icons/hi";
import {  Dialog,  DialogClose,  DialogContent,  DialogDescription,  DialogFooter,  DialogHeader,  DialogTitle,  DialogTrigger } from "@/components/ui/dialog"

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast_msg } from '@/lib/toast';
import { get_auth_request, patch_auth_request } from '@/app/api';
import { AxiosResponseHeaders } from 'axios';
import { useRouter } from 'next/navigation';
import { AppointmentProps, AppointmentType } from '@/types';
import { Loader2Icon } from 'lucide-react';
import { PageHeader } from './reuseable_heading_component';
import { useChat } from '@/app/context/ChatContext';


const PatientAppointments = () => {
    const router = useRouter()
    const {user_information} = useChat()
    const [today, setToday] = useState(Math.floor(Date.now() / 1000)); // Unix timestamp in seconds
    const [position, setPosition] = useState('');
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [filter_appointment, setFilter_appointment] = useState('')
    const [loading_2, setLoading_2] = useState(false)
    const [open_drop_down, setOpen_drop_down] = useState(false)
    const [page_number, setPage_number] = useState(1)
    const [items_per_page, setItems_per_page] = useState(10)
    let count = 0
    

    const [appointment_info, setAppointment_info] = useState<AppointmentProps>({appointments: [], accepted_appointment: 0, completed_appointment: 0, pending_appointment: 0, total_number_of_appointments: 0, total_number_of_pages: 0})

    const [filtered_appointment_info, setFiltered_appointment_info] = useState<AppointmentType[]>([])

    const [selected_appointment_info, setSelected_appointment_info] = useState<AppointmentType | null>(null)

    useEffect(() => {

        handle_fetch_appointments(page_number, items_per_page)

    }, [selected_appointment_info?.status])

    useEffect(() => {

        const new_list = appointment_info.appointments.filter((item:AppointmentType)=>{

            return(
                item.status.toLowerCase().includes(filter_appointment.toLowerCase()) 
            )

        })

        setFiltered_appointment_info(new_list)
    
    }, [appointment_info.appointments, filter_appointment, loading])

    const handle_fetch_appointments = useCallback(async(page_number:number, limit:number)=> {
        try {
            
            const res = await get_auth_request(`auth/get-appointment/${page_number}/${limit}`) as AxiosResponseHeaders

            
            if(res.status == 200 || res.status == 201){
                
                setAppointment_info({...appointment_info, ...res.data.data})

                setLoading(false)

                count = 0

            }else{

                if (res.status == 401) {
                    
                    toast_msg({title: 'Session expired', type:'danger'})

                    return router.push('/login')
                }
                else if(res.status == 500 ){

                    toast_msg({title: res.response.data.msg})

                    
                    if (count < 5){

                        count ++

                        setTimeout(() => {
                            console.log('retry count ', count)
                            
                            handle_fetch_appointments(page_number, items_per_page)
                            
                        }, 1500);
                        
                    }else{
                        console.log('resetting retry count ',count)
                        setTimeout(() => {
                            console.log('retry count resetted ------------ ', count)
                            
                            handle_fetch_appointments(page_number, items_per_page)
                            
                        }, 10000);
                        count == 0
                        

                    }

                }
            }
        } catch (err) {
            console.log(err)
        }
    }, [router])

    

  // Filter appointments based on position
    const filteredAppointments = useMemo(() => {
        let filtered = [...physician_appointment_sample];

        const now = new Date().setHours(0, 0, 0, 0) / 1000; // Start of today in Unix

        switch (position) {
        case 'All':
            filtered = filtered.sort((a, b) => Number(a.time) - Number(b.time))
            break
        case 'Today':
            filtered = filtered.filter((item) => is_within_24hrs(Number(item.time)));
            break;
        case 'Tomorrow':
            filtered = filtered.filter((item) => {
            const tomorrow = now + 24 * 60 * 60;
            return Number(item.time) >= tomorrow && Number(item.time) < tomorrow + 24 * 60 * 60;
            });
            break;
        case 'Yesterday':
            filtered = filtered.filter((item) => {
            const yesterday = now - 24 * 60 * 60;
            return Number(item.time) >= yesterday && Number(item.time) < now;
            });
            break;
        case 'Last 7 Days':
            filtered = filtered.filter((item) => Number(item.time) >= now - 7 * 24 * 60 * 60);
            break;
        case 'Last Month':
            filtered = filtered.filter((item) => Number(item.time) >= now - 30 * 24 * 60 * 60);
            break;
        default:
            break;
        }

        return filtered.sort((a, b) => Number(a.time) - Number(b.time));
    }, [position, today]);

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

        handle_fetch_appointments(new_page_number, items_per_page)
        setPage_number(new_page_number)

    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = appointment_info?.total_number_of_pages ?? 1;
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

                setLoading(false)

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

        setOpen(false)

        //then close dialog
    }

    return (
        <div className="flex flex-col gap-3 font-mont">

            <span className="w-full flex max-sm:flex-col justify-between items-start sm:items-center gap-2 px-5 relative">
                <PageHeader text={'Appointments'} />


                <DropdownMenu>
                    <DropdownMenuTrigger className='w-full sm:w-[300px] rounded-[4px]'>
                        <span className="h-[50px] w-full flex items-center justify-between gap-1 px-5 bg-[#306ce9] text-white border border-gray-200 shadow-md rounded-sm">
                            <span className="h-full flex items-center gap-0.5">
                                <HiFilter className=' size-4 ' />
                                <p className="text-[13px] ">Filter</p>
                            </span>


                            <IoIosArrowDown className='size-5 ' />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent  className='w-[350px] sm:w-[300px] rounded-[4px] border-0 font-mont'>
                        
                        <div className="w-[350px] sm:w-[300px] flex flex-col p-3 rounded-[4px]   gap-5">

                            <span className="w-full flex flex-col gap-2">
                                <p className="text-[13px]">Filter by time</p>

                                <select name="filter_appointment" id="filter_appointment" className='h-[45px] bg-white border border-gray-300 rounded-[4px] px-3 text-[13px]' onChange={(e)=> setFilter_appointment(e.target.value)}>
                                    <option value="" className='text-[13px]'>Select Time</option>
                                    <option value="" className='text-[13px]'>All</option>
                                    <option value="today" className='text-[13px]'>Today</option>
                                    <option value="yesterday" className='text-[13px]'>Yesterday</option>
                                    <option value="last_week" className='text-[13px]'>Last Week</option>
                                    <option value="this_month" className='text-[13px]'>This Month</option>
                                    <option value="last_30_days" className='text-[13px]'>Last 30 days</option>
                                </select>
                            </span>

                            <span className="w-full flex flex-col gap-2">
                                <p className="text-[13px]">Filter by status</p>

                                <select name="filter_appointment" id="filter_appointment" className='h-[45px] bg-white border border-gray-300 rounded-[4px] px-3 text-[13px]' onChange={(e)=> setFilter_appointment(e.target.value)}>
                                    <option value="" className='text-[13px]'>Select status</option>
                                    <option value="" className='text-[13px]'>All</option>
                                    <option value="pending" className='text-[13px]'>Pending</option>
                                    <option value="accepted" className='text-[13px]'>Accepted</option>
                                    <option value="cancelled" className='text-[13px]'>Cancelled</option>
                                    <option value="completed" className='text-[13px]'>Completed</option>
                                </select>
                            </span>

                            <span className="w-full flex flex-col gap-2">
                                <p className="text-[13px]">Filter by Consultation type</p>

                                <select name="filter_appointment" id="filter_appointment" className='h-[45px] bg-white border border-gray-300 rounded-[4px] px-3 text-[13px]' onChange={(e)=> setFilter_appointment(e.target.value)}>
                                    <option value="" className='text-[13px]'>Select type</option>
                                    <option value="" className='text-[13px]'>All</option>
                                    <option value="chat" className='text-[13px]'>Chat</option>
                                    <option value="video" className='text-[13px]'>Video Call</option>
                                </select>
                            </span>

                            <span className="h-[45px] w-full mt-2">
                                <input type="text" name="filter_appointment" placeholder='Enter patient name ...' onChange={(e)=> setFilter_appointment(e.target.value)} className='input-type text-[13px]' />
                            </span>


                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                
            </span>
        {/* here will be the metric */}

            {/* <div className=" w-full temp-220 gap-3 md:gap-4 px-5">

                <div className="w-full min-h-[80px] px-4 py-3 rounded-sm shadow-md flex items-center justify-start gap-5 bg-white border border-gray-100">
                    <span className="sm:w-[55px] sm:h-[55px] w-[45px] h-[45px] flex-items-center justify-center">
                        <span className={`w-full h-full rounded-full bg-[#306ce9]/10 text-[#306ce9] flex items-center justify-center`}>
                            <AiOutlineCalendar  className='size-[25px] sm:size-[30px] '  />
                        </span>
                    </span>

                    <div className="flex-1 flex-col items-start justify-center gap-1">
                        <p className="text-[13.5px] ">All Appointment </p>
                        <p className=" text-[15.5px] font-medium">{appointment_info.total_number_of_appointments ?? 0} </p>
                    </div>
                </div>

                <div className="w-full min-h-[80px] px-4 py-3 rounded-md shadow-md flex items-center justify-start gap-5 bg-white border border-gray-100">
                    <span className="sm:w-[55px] sm:h-[55px] w-[45px] h-[45px] flex-items-center justify-center">
                        <span className={`w-full h-full rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center`}>
                            <AiOutlineClockCircle  className='size-[25px] sm:size-[30px] '  />
                        </span>
                    </span>

                    <div className="flex-1 flex-col items-start justify-center gap-1">
                        <p className="text-[13.5px] ">Pending </p>
                        <p className=" text-[15.5px] font-medium">{appointment_info.pending_appointment ?? 0} </p>
                    </div>
                </div>

                <div className="w-full min-h-[80px] px-4 py-3 rounded-md shadow-md flex items-center justify-start gap-5 bg-white border border-gray-100">
                    <span className="sm:w-[55px] sm:h-[55px] w-[45px] h-[45px] flex-items-center justify-center">
                        <span className={`w-full h-full rounded-full bg-green-500/10 text-green-500 flex items-center justify-center`}>
                            <MdCheckCircleOutline  className='size-[25px] sm:size-[30px] '  />
                        </span>
                    </span>

                    <div className="flex-1 flex-col items-start justify-center gap-1">
                        <p className="text-[13.5px] ">Accepted </p>
                        <p className=" text-[15.5px] font-medium">{appointment_info.accepted_appointment ?? 0} </p>
                    </div>
                </div>

                <div className="w-full min-h-[80px] px-4 py-3 rounded-md shadow-md flex items-center justify-start gap-5 bg-white border border-gray-100">
                    <span className="sm:w-[55px] sm:h-[55px] w-[45px] h-[45px] flex-items-center justify-center">
                        <span className={`w-full h-full rounded-full bg-[#306ce9]/10 text-[#306ce9] flex items-center justify-center`}>
                            <FaCheckCircle  className='size-[25px] sm:size-[30px] '  />
                        </span>
                    </span>

                    <div className="flex-1 flex-col items-start justify-center gap-1">
                        <p className="text-[13.5px] ">Completed </p>
                        <p className=" text-[15.5px] font-medium">{appointment_info.completed_appointment ?? 0} </p>
                    </div>
                </div>


            </div> */}

            <div className="w-full h-full">


                <div className="w-full hide-scrollbar ">

                    <>
                    
                        { 
                            filtered_appointment_info.length === 0 ? 
                            <div className=" w-[calc(100%-39px)] mx-auto  flex h-[calc(100vh-220px)] rounded-lg p-5 items-center justify-center relative">
                                <p className="text-[13px] text-gray-600 text-center py-2">{!loading && "No appointment found with the selected criteria"}</p>

                                {loading && 
                                <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                                    <Loader2Icon className='size-8 animate-spin text-gray-600' />
                                </div> }
                            </div>
                        :

                            <div className="w-full temp-240 min-h-[calc(100vh-220px)] gap-5  my-3 px-5 relative">
                                {loading && 
                                <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                                    <Loader2Icon className='size-8 animate-spin text-gray-600' />
                                </div> }

                                {filtered_appointment_info.map((item, ind:number) => {
                                    const {status, physician} = item
                                    const date = format_date_from_unix(Number(item.time));

                                    const {first_name, last_name, registered_as, gender, bio, specialty, languages_spoken, country} = physician

                                    const appointments_within_24hrs = is_within_24hrs(Number(item.time));

                                    const text_color = status == 'pending' ? 'text-amber-500' : (status === 'missed' || status == 'cancelled') ? 'text-red-500' : status == 'completed' ? 'text-[#3062e9]' : 'text-green-500'

                                    const ring_color = status == 'pending' ? 'ring-amber-500' : (status === 'missed' || status == 'cancelled') ? 'ring-red-200' : status == 'completed' ? 'ring-blue-200' : 'ring-green-200'

                                    const image = item.physician?.avatar || '/default-man.png'

                                    return (
                                    <div key={ind} className="max-w-[550px]">
                                        <Dialog >
                                            <DialogTrigger className='w-full'>
                                                <div  className={` cursor-pointer hover:bg-[#306ce9] bg-white ease-in-out duration-300 w-full flex flex-col font-mont rounded-lg box-shadow-1 shadow-md text-gray-700 hover:text-white group relative`} onClick={()=> setSelected_appointment_info(item)} >
                                                    <div className="w-full min-h-[200px] flex flex-col items-center gap-4 p-3 sm:p-4">
                                                        
                                                        <span className="w-full flex items-center justify-between">
                                                            <h5 className={`text-[12px] `}>
                                                                {date.date}
                                                            </h5>
                                                            <h5 className={`text-[12px] `}>
                                                                {date.time}
                                                            </h5>
                                                        </span>

                                                        <span className={`relative overflow-hidden rounded-full h-14 w-14 `}>
                                                            <Image src={image} alt={item.time.toString()} fill objectFit='cover' />
                                                        </span>

                                                        <div className="w-full flex flex-col items-center gap-2 ">
                                                            <p className={`text-[13px] `}>
                                                                Dr {item.physician?.first_name} {item.physician.last_name}
                                                            </p>

                                                            <p className={`text-[12px] `}>
                                                                {item.physician?.specialty ? item.physician?.specialty : 'General Doctor' } 
                                                            </p>
                                                        </div>

                                                        <p className={`text-[13px] w-full text-center group-hover:text-white duration-300 ${text_color}`}>{item.status}</p>
                                                    </div>

                                                    <span
                                                        className={`h-[50px] w-full flex items-center gap-3 border-t  group-hover:border-blue-400 border-gray-200 duration-300
                                                        `}>
                                                        {item.appointment_type === 'chat' ? (
                                                        <span className="flex items-center justify-center h-[50px] w-full text-[13px] gap-2">
                                                            <MessageSquare className="" size={'15px'} />
                                                            Chat
                                                        </span>
                                                        ) : (
                                                        <span className="flex items-center justify-center h-[50px] w-full text-[13px] gap-2">
                                                            <VideoIcon className="" size={'15px'} />
                                                            Video
                                                        </span>
                                                        )}
                                                    </span>
                                                </div>
                                            </DialogTrigger>

                                            <DialogContent  className='font-mont w-[500px] md:w-[700px] lg:w-[900px] px-0'>
                                                <DialogHeader className='border-b border-gray-200 pb-3 px-5'>
                                                    <DialogTitle className='text-[15.5px]' >Appointment Information</DialogTitle>
                                                    <DialogDescription className='text-[13px]'>{`You've booked an appointment with Dr ${physician.first_name} ${physician.last_name} scheduled for ${date.date}, ${date.time}`}</DialogDescription>
                                                </DialogHeader>

                                                <div className='px-5 w-full grid grid-cols-2 gap-5 lg:gap-0 max-h-[65vh]  overflow-y-auto mt-2'>
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
                                                
                                                <DialogFooter className='px-5  gap-2  border-t border-gray-200 pt-5' >
                                                    <DialogClose className="md:h-[45px] h-[40px] px-5 sm:px-7 rounded-sm bg-gray-200 text-gray-700 hover:bg-gray-200/80 duration-300 text-sm ">Cancel</DialogClose>

                                                    {user_information?.role == 'physician' && <>

                                                        {(selected_appointment_info && selected_appointment_info.status == 'pending') && <button className="md:h-[45px] h-[40px] w-[120px] sm:px-7 rounded-sm bg-[#306ce9] text-white hover:bg-[#306ce9]/90 duration-300 flex items-center justify-center text-sm " onClick={handle_submit} disabled={loading} >
                                                            {loading_2 ? <Loader2Icon className={'animate-spin size-8'} /> : "Accept" }
                                                        </button>}
                                                    </>}
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                    </div>
                                    );
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
    );
};

export default PatientAppointments;