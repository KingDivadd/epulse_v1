'use client'
import React, {useState,useEffect} from 'react'
import { consultation_card_list } from '@/constants'
import {format_date_from_unix, is_within_24hrs, is_within_12hrs} from "@/lib/date_formater"
import Image from 'next/image'
import {ClockIcon, CalendarClock, VideoIcon, MessageSquare, MessageSquareDot, ChevronDown } from 'lucide-react' 
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader,  DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

const Appointments = () => {
    const [today, setToday] = useState(Math.floor(Date.now()))
    const [position, setPosition] = React.useState("")

    


    return (
        <div className=" flex flex-col gap-4  ">
            <h3 className="font-mont font-semibold text-lg  text-slate-700">All Appointments</h3>

            {/* <Drawer >   
                <DrawerTrigger >Open</DrawerTrigger>
                <DrawerContent className='h-[600px] '  >
                    <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <span>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </span>
                </DrawerContent>
            </Drawer> */}

            <span className="flex flex-col items-start justify-start gap-2 w-[250px]">

                <DropdownMenu >
                    <DropdownMenuTrigger asChild className='w-[250px]'>
                        <Button className='w-full h-[45px] border border-gray-400 bg-white text-[14px] font-mont justify-between outline-0 hover:bg-white focus:bg-white rounded text-gray-600' variant="outline">
                            {position || 'Filter'}
                            <ChevronDown className="h-10 w-10 text-slate-800" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[250px] bg-white  box-shadow-1 p-2 z-20">
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className='w-full '>
                            <DropdownMenuRadioItem className='w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa] ' value="Today">Today</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className='w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa] ' value="Tomorrow">Tomorrow</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className='w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa] ' value="Yesterday">Yesterday</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className='w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa] ' value="Last 7 Days">Last 7 Days</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem className='w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa] ' value="Last Month">Last Month</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </span>


            <div className="w-full mt-2 overflow-y-auto max-h-[90vh] hide-scrollbar ">
                <div className="w-full temp-240 ">
                    {
                        consultation_card_list.sort((a, b) => a.appointment_date - b.appointment_date).map((item,ind)=>{

                            const date = format_date_from_unix(Number(item.appointment_date))

                            const appointments_within_24hrs = ind === 0


                            return(
                                <div key={ind} className="w-full">

                                    <div className={`hidden hover:translate-y-2  ease-in-out duration-300  w-full md:flex flex-col font-mont rounded-lg box-shadow-1 ${appointments_within_24hrs ? "bg-[#306ce9]": "bg-white group "}`}>

                                        <div  className="w-full min-h-[240px] flex flex-col items-center gap-7 p-3 sm:p-5">
                                            <span className="w-full flex items-center justify-between">
                                                <h5 className={`${appointments_within_24hrs ? 'text-white':'text-slate-700'}  text-[13px] sm:text-[14px]`}>{date.date}</h5>
                                                <h5 className={`${appointments_within_24hrs ? 'text-white':'text-slate-700'}  text-[13px] sm:text-[14px]`}>{date.time}</h5>
                                            </span>

                                            <span className=" relative overflow-hidden rounded-full h-17 w-17 ">
                                                <Image src={item.img} alt={item.appointment_date.toString()} fill objectFit='cover' />
                                            </span>

                                            <div className="w-full flex flex-col items-center gap-2 md:gap-3">
                                                <p className={`text-sm font-medium ${appointments_within_24hrs ? 'text-white':'text-slate-700'}`}>{item.registered_as}</p>
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

                                    <div className="w-full md:hidden ">

                                        <Drawer>
                                            <DrawerTrigger className='w-full'>
                                                <div key={ind} className={`w-full flex flex-col font-mont rounded-lg box-shadow-1 ${appointments_within_24hrs ? "bg-[#306ce9] duration-700 ": "bg-white hover:bg-gray-100 group "}`}>

                                                    <div key={ind} className="w-full min-h-[240px] flex flex-col items-center gap-7 p-3 sm:p-5">
                                                        <span className="w-full flex items-center justify-between">
                                                            <h5 className={`${appointments_within_24hrs ? 'text-white':'text-slate-700'}  text-[13px] sm:text-[14px]`}>{date.date}</h5>
                                                            <h5 className={`${appointments_within_24hrs ? 'text-white':'text-slate-700'}  text-[13px] sm:text-[14px]`}>{date.time}</h5>
                                                        </span>

                                                        <span className=" relative overflow-hidden rounded-full h-17 w-17 ">
                                                            <Image src={item.img} alt={item.appointment_date.toString()} fill objectFit='cover' />
                                                        </span>

                                                        <div className="w-full flex flex-col items-center gap-2 md:gap-3">
                                                            <p className={`text-sm font-medium ${appointments_within_24hrs ? 'text-white':'text-slate-700'}`}>{item.registered_as}</p>
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
                                                    <DrawerTitle>Doctor's Information</DrawerTitle>
                                                </DrawerHeader>
                                                    
                                                <div className="w-full flex item-center justify-start gap-5 p-5 relative rounded-lg">
                                                    <span className="h-[225px] ">
                                                        <Image src={item.img} alt='profile-img' fill objectFit='cover' className='rounded-lg' />
                                                    </span>
                                                </div>

                                                <div className="w-full flex flex-col gap-2 mt-5">
                                                    <span className="flex w-full gap-2 items-center justify-starat">
                                                        <p className="text-sm font-medium">Doctor's Name:</p>
                                                        <p className="text-sm ">Dr. {item.first_name} {item.last_name}</p>
                                                    </span>
                                                    <span className="flex w-full gap-2 items-center justify-starat">
                                                        <p className="text-sm font-medium">Doctor's Speciality:</p>
                                                        <p className="text-sm "> {item.registered_as}</p>
                                                    </span>
                                                    <span className="flex w-full gap-2 items-center justify-starat">
                                                        <p className="text-sm font-medium">Language:</p>
                                                        <p className="text-sm ">{item.languages_spoken}</p>
                                                    </span>
                                                    <DrawerDescription className='text-black flex flex-col gap-2'>
                                                        {/* <p className="text-sm font-medium">Description:</p> */}
                                                        <span className="flex w-full gap-2 items-center justify-starat">
                                                            <span className="text-sm ">{item.description}</span>
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

export default Appointments