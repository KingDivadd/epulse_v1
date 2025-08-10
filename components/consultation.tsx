'use client'
import React, {useState,useEffect} from 'react'
import { consultation_card_list } from '@/constants'
import {format_date_from_unix, is_within_24hrs} from "@/lib/date_formater"
import Image from 'next/image'
import { MessageSquare, VideoIcon } from 'lucide-react'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from './ui/drawer'

const Consultation = () => {
    const [today, setToday] = useState(Math.floor(Date.now()))



    return (
        <div className="w-full flex flex-col ">
            <h3 className="font-mont font-semibold text-lg text-slate-700">Appointments</h3>

            <div className="h-[50px] mt-1 flex items-center justify-start gap-10 border-b border-slate-100">
                <span className={true ? 'current-consultation-nav':'consultation-nav'}>Upcoming</span>
                <span className={!true?'current-consultation-nav':'consultation-nav'}>Recent</span>
            </div>

            <div className="w-full  mt-5 overflow-y-auto max-h-[450px] sm:max-h-[550px] hide-scrollbar ">
                <div className="w-full temp-240">
                    {
                        consultation_card_list.sort((a, b) => a.appointment_date - b.appointment_date).map((item,ind)=>{

                            const date = format_date_from_unix(Number(item.appointment_date))

                            const appointments_within_24hrs = is_within_24hrs(Number(item.appointment_date))


                            return(
                                <div key={ind} className="w-full">

                                    <div className="w-full hidden md:block">

                                        <div className={appointments_within_24hrs ? "w-full flex flex-col font-mont rounded-lg shadow-md bg-gradient-to-t bg-[#306ce9] duration-700 ": "bg-white w-full flex flex-col font-mont rounded-lg shadow-md hover:bg-slate-100 group duration-700 group "}>

                                            <div key={ind} className="w-full h-[240px] flex flex-col items-center gap-7 p-3 sm:p-5">
                                                <span className="w-full flex items-center justify-between">
                                                    <h5 className={`${appointments_within_24hrs ? 'text-white':'text-slate-700'}  text-[13px] sm:text-[14px]`}>{date.date}</h5>
                                                    <h5 className={`${appointments_within_24hrs ? 'text-white':'text-slate-700'}  text-[13px] sm:text-[14px]`}>{date.time}</h5>
                                                </span>

                                                <span className=" relative overflow-hidden rounded-full h-17 w-17 ">
                                                    <Image src={item.img} alt={item.appointment_date.toString()} fill objectFit='cover' />
                                                </span>

                                                <div className="w-full flex flex-col items-center gap-3">
                                                    <p className={`text-[13px] font-medium ${appointments_within_24hrs ? 'text-white':'text-slate-700'}`}>{item.registered_as}</p>
                                                    <p className={`text-[14px] ${appointments_within_24hrs ? 'text-white':'text-slate-700'}`}>dr {item.last_name} {item.first_name} </p>
                                                </div>
                                            </div>

                                            <span className={`border-t  group-hover:border-gray-200 flex items-center justify-center h-[50px] w-full text-[13px] gap-2 ${appointments_within_24hrs ? 'text-white border-blue-400':'text-slate-700 border-gray-100'}`}>
                                                <MessageSquare className='' size={'15px'} />
                                                Chat now
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full md:hidden ">

                                        <Drawer>
                                            <DrawerTrigger className='w-full'>
                                                <div key={ind} className={`w-full flex flex-col font-mont rounded-lg shadow-md ${appointments_within_24hrs ? "bg-[#306ce9] duration-700 ": "bg-white hover:bg-gray-50 group "}`}>

                                                    <div key={ind} className="w-full min-h-[240px] flex flex-col items-center gap-7 p-3 sm:p-5">
                                                        <span className="w-full flex items-center justify-between">
                                                            <h5 className={`${appointments_within_24hrs ? 'text-white':'text-slate-700'}  text-[13px] sm:text-[14px]`}>{date.date}</h5>
                                                            <h5 className={`${appointments_within_24hrs ? 'text-white':'text-slate-700'}  text-[13px] sm:text-[14px]`}>{date.time}</h5>
                                                        </span>

                                                        <span className=" relative overflow-hidden rounded-full h-17 w-17 ">
                                                            <Image src={item.img} alt={item.appointment_date.toString()} fill objectFit='cover' />
                                                        </span>

                                                        <div className="w-full flex flex-col items-center gap-2 md:gap-3">
                                                            <p className={`text-[13px] font-medium ${appointments_within_24hrs ? 'text-white':'text-slate-700'}`}>{item.registered_as}</p>
                                                            <p className={`text-[14px] ${appointments_within_24hrs ? 'text-white':'text-slate-700'}`}>dr {item.last_name} {item.first_name} </p>

                                                            <p className={`block md:hidden text-[14px] ${appointments_within_24hrs ? 'text-white':'text-slate-700'}`}>{item.languages_spoken} </p>
                                                        </div>

                                                        
                                                    </div>

                                                    <span className={`h-[50px] w-full flex items-center gap-3 border-t ${appointments_within_24hrs ? "text-white border-blue-400": 'border-gray-200' } `}>

                                                        { ind % 2 == 1 ?
                                                            <span className={` flex items-center justify-center h-[50px] w-full text-[13px] gap-2`}>
                                                            <MessageSquare className='' size={'15px'} />
                                                            Chat 
                                                        </span>:
                                                        <span className={` flex items-center justify-center h-[50px] w-full text-[13px] gap-2`}>
                                                            <VideoIcon className='' size={'15px'} />
                                                            Video 
                                                        </span>
                                                        }


                                                    </span>

                                                </div>
                                            </DrawerTrigger>

                                            <DrawerContent className='p-5 font-mont'>
                                                <DrawerHeader>
                                                    <DrawerTitle>{"Doctor's Information"}</DrawerTitle>
                                                </DrawerHeader>
                                                    
                                                <div className="w-full flex item-center justify-start gap-5 p-5 relative rounded-lg">
                                                    <span className="h-[225px] ">
                                                        <Image src={item.img} alt='profile-img' fill objectFit='cover' className='rounded-lg' />
                                                    </span>
                                                </div>

                                                <div className="w-full flex flex-col gap-2 mt-5">
                                                    <span className="flex w-full gap-2 items-center justify-starat">
                                                        <p className="text-[13px] font-medium">{"Doctor's Name:"}</p>
                                                        <p className="text-[13px] ">Dr. {item.first_name} {item.last_name}</p>
                                                    </span>
                                                    <span className="flex w-full gap-2 items-center justify-starat">
                                                        <p className="text-[13px] font-medium">{"Doctor's Speciality:"}</p>
                                                        <p className="text-[13px] "> {item.registered_as}</p>
                                                    </span>
                                                    <span className="flex w-full gap-2 items-center justify-starat">
                                                        <p className="text-[13px] font-medium">Language:</p>
                                                        <p className="text-[13px] ">{item.languages_spoken}</p>
                                                    </span>
                                                    <DrawerDescription className='text-black flex flex-col gap-2'>
                                                        {/* <p className="text-[13px] font-medium">Description:</p> */}
                                                        <span className="flex w-full gap-2 items-center justify-starat">
                                                            <span className="text-[13px] ">{item.description}</span>
                                                        </span>
                                                    </DrawerDescription>
                                                </div>

                                                
                                            </DrawerContent>
                                        </Drawer>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


        </div>
    )
}

export default Consultation