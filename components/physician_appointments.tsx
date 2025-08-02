'use client';
import React, { useState, useMemo } from 'react';
import { format_date_from_unix, is_within_24hrs } from '@/lib/date_formater';
import Image from 'next/image';
import {  VideoIcon, MessageSquare, MessageSquareDot, ChevronDown} from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import {metrics, physician_appointment_sample} from "@/constants"
import { HiFilter } from "react-icons/hi";
import {  Dialog,  DialogClose,  DialogContent,  DialogDescription,  DialogFooter,  DialogHeader,  DialogTitle,  DialogTrigger } from "@/components/ui/dialog"

import { Button } from '@/components/ui/button';

import {  Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader,  DrawerTitle,  DrawerTrigger } from '@/components/ui/drawer';
import { toast_msg } from '@/lib/toast';

interface ShowSelectedAppointmentProps {
  show_selected_appointment: boolean;
  setShow_selected_appointment: (show_selected_appointment: boolean) => void;
}

const PhysicianAppointments = ({ show_selected_appointment, setShow_selected_appointment }: ShowSelectedAppointmentProps) => {
  const [today, setToday] = useState(Math.floor(Date.now() / 1000)); // Unix timestamp in seconds
  const [position, setPosition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 8; // Adjust based on your design needs
  const totalPages = Math.ceil(physician_appointment_sample.length / appointmentsPerPage);
  const [show_filter, setShow_filter] = useState(false)
  const [open, setOpen] = useState(false)

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

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  function handle_submit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()

    toast_msg({title: 'Appointment accepted successfully.'})

    setOpen(false)

    //then close dialog
  }

  return (
    <div className="flex flex-col gap-4">
      {/* here will be the metric */}

      <div className="w-full temp-240 gap-3 md:gap-5">
        {
          metrics.map((data,ind:number)=>{
            const {icon, id, name, count} = data

            const icon_color = id == 'pending' ? 'text-amber-500' : id == 'approved' ? 'text-green-500' : "text-[#306ce9]" 
            const bg_color = id == 'pending' ? 'bg-amber-500/10' : id == 'approved' ? 'bg-green-500/10' : "bg-[#306ce9]/10" 

            return(
              <div key={ind} className="w-full min-h-[90px] sm:min-h-[100px] p-4 rounded-md box-shadow-1 shadow-md flex items-center justify-start gap-5 bg-white">
                <span className="sm:w-[55px] sm:h-[55px] w-[45px] h-[45px] flex-items-center justify-center">
                  <span className={`w-full h-full rounded-full ${bg_color} ${icon_color} flex items-center justify-center`}>
                    <data.icon  className='size-[25px] sm:size-[30px] '  />
                  </span>
                </span>

                <div className="flex-1 flex-col items-start justify-center gap-1">
                  <p className="sm:text-md text-[14px] ">{name} </p>
                  <p className="sm:text-lg text-md font-medium">{count} </p>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className="w-full h-full py-5 sm:bg-white rounded-md">

        <span className="w-full flex flex-col items-start gap-5 sm:gap-3 sm:px-5 ">
          <h3 className="font-mont font-semibold text-md sm:text-lg text-slate-700 ">All Appointments</h3>

          <div className="w-full min-h-[50px] flex flex-col shadow-md duration-300 rounded-sm bg-white">
            <span className="h-[50px] flex items-center justify-start gap-1 w-full px-5 cursor-pointer"
              onClick={()=> setShow_filter(!show_filter)}>
                <HiFilter className='text-gray-700 size-[20px]' />
                <p className="text-md font-medium">Filter</p>
            </span>

            {show_filter && <div className="w-full flex flex-col gap-5 p-5 duration-300 ">
              <span className="w-full flex flex-col gap-2">
                <p className="sm:text-md text-sm">Filter By Date</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="">
                    <button
                      className="w-full  h-[45px] box-shadow-1 text-[14px] font-mont px-3 flex items-center justify-between border  sm:border-gray-400 border-gray-300 bg-white hover:bg-white focus:bg-white rounded text-gray-600">
                      {position || 'Filter'}
                      <ChevronDown size={'18px'} className=" text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent  className="w-[250px] bg-white shadow-md p-2 z-20 left-0">
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className="w-full">
                      <DropdownMenuRadioItem
                        className="w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa]"
                        value="All" >
                        All Appointments
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        className="w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa]"
                        value="Today" >
                        Today
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        className="w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa]"
                        value="Tomorrow"
                      >
                        Tomorrow
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        className="w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa]"
                        value="Yesterday"
                      >
                        Yesterday
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        className="w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa]"
                        value="Last 7 Days"
                      >
                        Last 7 Days
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        className="w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa]"
                        value="Last Month"
                      >
                        Last Month
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>

              <div className="w-full flex flex-col gap-2 ">
                <p className="text-sm sm:text-md font-mont">Filter By Status</p>
                <select name="status_filter" id="status_filter" className='w-full h-[45px] border sm:border-gray-400 border-gray-300 rounded-[5px] font-mont text-sm px-2 '>
                  <option value="All Appointments" className='text-[13px] px-5 ]' >All Appointments</option>
                  <option value="Today's Appointments" className='text-[13px] px-5 ]' >{"Today's Appointments"}</option>
                  <option value="Pending Appointments" className='text-[13px] px-5 ]' >Pending Appointments</option>
                  <option value="Approved Appointments" className='text-[13px] px-5 ]' >Approved Appointments</option>
                  <option value="Completed Appointments" className='text-[13px] px-5 ]' >Completed Appointments</option>
                  <option value="Missed Appointments" className='text-[13px] px-5 ]' >Missed Appointments</option>
                </select>
              </div>
            </div>}

          </div>
        </span>

        <div className="w-full hide-scrollbar mt-5">
          

          <div className="w-full temp-240 gap-5 sm:px-5 my-3">
            {filteredAppointments
              .slice((currentPage - 1) * appointmentsPerPage, currentPage * appointmentsPerPage)
              .map((item, ind:number) => {
                const {status} = item
                const date = format_date_from_unix(Number(item.time));
                const appointments_within_24hrs = is_within_24hrs(Number(item.time));

                const text_color = status == 'pending' ? 'text-amber-500' : status === 'missed' ? 'text-red-500' : status == 'completed' ? 'text-[#3062e9]' : 'text-green-500'

                return (
                  <div key={ind} className="w-full">
                    <Dialog >
                      <DialogTrigger className='w-full'>
                        <div  className={` cursor-pointer hover:bg-[#306ce9] bg-white ease-in-out duration-300 w-full flex flex-col font-mont rounded-lg box-shadow-1 shadow-md text-gray-700 hover:text-white group relative`}
                      onClick={() => {setShow_selected_appointment(!show_selected_appointment)}} >
                          <div className="w-full min-h-[200px] flex flex-col items-center gap-5 p-3 sm:p-4">
                            <p className={`text-[13px] w-full text-end group-hover:text-white duration-300 ${text_color}`}>{item.status}</p>
                            <span className="w-full flex items-center justify-between">
                              <h5 className={`text-[13px] sm:text-[14px]`}>
                                {date.date}
                              </h5>
                              <h5 className={`text-[13px] sm:text-[14px]`}>
                                {date.time}
                              </h5>
                            </span>

                            <span className="relative overflow-hidden rounded-full h-17 w-17">
                              <Image src={item.avatar} alt={item.time.toString()} fill objectFit='cover' />
                            </span>

                            <div className="w-full flex flex-col items-center gap-2 md:gap-3">
                              <p className={`text-[14px] `}>
                                  {item.last_name} {item.first_name}
                              </p>
                              {/* <p className={`block md:hidden text-[14px] `}>
                                {item.languages_spoken}
                              </p> */}
                            </div>
                          </div>

                          <span
                            className={`h-[50px] w-full flex items-center gap-3 border-t  group-hover:border-blue-400 border-gray-200
                            `}>
                            {item.consultation_type === 'chat' ? (
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
                          <DialogTitle className='text-md' >Appointment Information</DialogTitle>
                          <DialogDescription className='text-[13px]'>{"David Iroegbu has booked a video appoitnment for 31st of July, at 11:00 AM"}</DialogDescription>
                        </DialogHeader>

                        <div className='px-5 w-full grid grid-cols-2 gap-5 lg:gap-0 max-h-[65vh]  overflow-y-auto mt-2'>
                          <div className="col-span-2 md:col-span-1 flex flex-col gap-5  h-full max-md:border-b border-gray-200 max-md:pb-5">
                              <p className="text-[13px] font-medium w-full text-center text-amber-500">{"Appoinment Pending"}</p>
                            
                              <span className="lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[300px] h-[300px]  relative overflow-hidden rounded-full mx-auto ">
                                <Image src={'/profile-img-2a.jpg'} alt='' layout='fill' objectFit='cover' />
                              </span>

                              <p className="text-sm font-medium  text-center ">{"David Iroegbu"}</p>

                              <p className="text-sm font-medium  text-center ">{"31st of May, 2025 at 11:00 AM"}</p>

                              <p className="text-sm font-medium  text-center ">{"Video Appointment"}</p>
                          </div>

                          <div className="col-span-2 md:col-span-1 flex flex-col gap-4  h-full  ">
                            <span className="flex items-center justify-start gap-2">
                              <p className="text-[13px] font-medium">Country:</p>
                              <p className="text-[13px] ">{"Nigeria"}</p>
                            </span>
                            <span className="flex items-center justify-start gap-2">
                              <p className="text-[13px] font-medium">Gender:</p>
                              <p className="text-[13px] ">{"Male"}</p>
                            </span>
                            <span className="flex items-center justify-start gap-2">
                              <p className="text-[13px] font-medium">Age:</p>
                              <p className="text-[13px] ">{"35"}</p>
                            </span>
                            <span className="flex items-center justify-start gap-2">
                              <p className="text-[13px] font-medium">Height (cm):</p>
                              <p className="text-[13px] ">{"175"}</p>
                            </span>
                            <span className="flex items-center justify-start gap-2">
                              <p className="text-[13px] font-medium">Weight (kg):</p>
                              <p className="text-[13px] ">{"75"}</p>
                            </span>
                            <span className="flex items-center justify-start gap-2">
                              <p className="text-[13px] font-medium">Blood Group:</p>
                              <p className="text-[13px] ">{"O+"}</p>
                            </span>
                            <span className="flex items-center justify-start gap-2">
                              <p className="text-[13px] font-medium">Genotype:</p>
                              <p className="text-[13px] ">{"AC"}</p>
                            </span>
                            <span className="flex flex-col items-start justify-start gap-1">
                              <p className="text-[13px] font-medium">Complaint:</p>
                              <p className="text-[13px] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quod unde praesentium culpa. Iure voluptate nam doloremque nulla excepturi ab ducimus dolorem ex aliquid. Omnis voluptatibus exercitationem enim, amet architecto sed officia incidunt fuga quo eligendi a rerum nulla delectus animi impedit commodi repudiandae illum minus iste magnam possimus cupiditate nam? Aut porro vitae explicabo minus soluta qui neque mollitia esse nam quia inventore praesentium numquam, ipsam consectetur architecto voluptas ducimus. Non facilis sapiente officia expedita, error dolor possimus aspernatur explicabo animi beatae minima velit quos magni. Odio, quaerat reiciendis?</p>
                            </span>
                          </div>
                        </div>
                        
                        <DialogFooter className='px-5  gap-2  border-t border-gray-200 pt-5' >
                            <DialogClose className="md:h-[45px] h-[40px] px-5 sm:px-7 rounded-sm bg-gray-200 text-gray-700 hover:bg-gray-200/80 duration-300">Cancel</DialogClose>
                            <button className="md:h-[45px] h-[40px] px-5 sm:px-7 rounded-sm bg-[#306ce9] text-white hover:bg-[#306ce9]/90 duration-300" onClick={handle_submit} >Accept</button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                  </div>
                );
              })}
          </div>
        </div>

        {/* Pagination */}
        {filteredAppointments.length > 0 && (
          <div className="w-full px-5 flex items-center justify-center gap-4 pt-4 border-t border-gray-300">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-5 py-1.5 sm:bg-white  border border-gray-400 sm:border-gray-500  rounded-full max-sm:disabled:bg-gray-300 disabled:text-gray-500 text-sm"
            >
              Previous
            </button>
            <span className="text-sm text-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-5 py-1.5 sm:bg-white  border border-gray-400 sm:border-gray-500  rounded-full max-sm:disabled:bg-gray-300 disabled:text-gray-500 text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default PhysicianAppointments;