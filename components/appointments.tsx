'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { consultation_card_list } from '@/constants';
import { format_date_from_unix, is_within_24hrs, is_within_12hrs } from '@/lib/date_formater';
import Image from 'next/image';
import {
  ClockIcon,
  CalendarClock,
  VideoIcon,
  MessageSquare,
  MessageSquareDot,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface ShowSelectedAppointmentProps {
  show_selected_appointment: boolean;
  setShow_selected_appointment: (show_selected_appointment: boolean) => void;
}

const Appointments = ({ show_selected_appointment, setShow_selected_appointment }: ShowSelectedAppointmentProps) => {
  const [today, setToday] = useState(Math.floor(Date.now() / 1000)); // Unix timestamp in seconds
  const [position, setPosition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 8; // Adjust based on your design needs
  const totalPages = Math.ceil(consultation_card_list.length / appointmentsPerPage);

  // Filter appointments based on position
  const filteredAppointments = useMemo(() => {
    let filtered = [...consultation_card_list];
    const now = new Date().setHours(0, 0, 0, 0) / 1000; // Start of today in Unix

    switch (position) {
      case 'Today':
        filtered = filtered.filter((item) => is_within_24hrs(Number(item.appointment_date)));
        break;
      case 'Tomorrow':
        filtered = filtered.filter((item) => {
          const tomorrow = now + 24 * 60 * 60;
          return Number(item.appointment_date) >= tomorrow && Number(item.appointment_date) < tomorrow + 24 * 60 * 60;
        });
        break;
      case 'Yesterday':
        filtered = filtered.filter((item) => {
          const yesterday = now - 24 * 60 * 60;
          return Number(item.appointment_date) >= yesterday && Number(item.appointment_date) < now;
        });
        break;
      case 'Last 7 Days':
        filtered = filtered.filter((item) => Number(item.appointment_date) >= now - 7 * 24 * 60 * 60);
        break;
      case 'Last Month':
        filtered = filtered.filter((item) => Number(item.appointment_date) >= now - 30 * 24 * 60 * 60);
        break;
      default:
        break;
    }

    return filtered.sort((a, b) => Number(a.appointment_date) - Number(b.appointment_date));
  }, [position, today]);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-mont font-semibold text-lg text-slate-700 sm:px-5">All Appointments</h3>

      <span className="flex flex-col items-start justify-start gap-2 w-[250px] sm:px-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-[250px]">
            <Button
              className="w-full h-[45px] border border-gray-400 bg-white text-[14px] font-mont justify-between outline-0 hover:bg-white focus:bg-white rounded text-gray-600"
              variant="outline"
            >
              {position || 'Filter'}
              <ChevronDown className="h-10 w-10 text-slate-800" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[250px] bg-white shadow-md p-2 z-20">
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className="w-full">
              <DropdownMenuRadioItem
                className="w-full h-[40px] text-[13px] flex items-center pl-3 font-mont hover:bg-[#fafafa]"
                value="Today"
              >
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

      <div className="w-full hide-scrollbar ">
        <div className="w-full temp-240 gap-5 sm:px-5 my-3">
          {filteredAppointments
            .slice((currentPage - 1) * appointmentsPerPage, currentPage * appointmentsPerPage)
            .map((item, ind:number) => {
              const date = format_date_from_unix(Number(item.appointment_date));
              const appointments_within_24hrs = is_within_24hrs(Number(item.appointment_date));

              return (
                <div key={ind} className="w-full">
                  <div
                    className={`hidden hover:bg-[#306ce9] ease-in-out duration-300 w-full md:flex flex-col font-mont rounded-lg box-shadow-1 shadow-md text-gray-700 hover:text-white group`}
                    onClick={() => setShow_selected_appointment(!show_selected_appointment)}
                  >
                    <div className="w-full min-h-[240px] flex flex-col items-center gap-7 p-3 sm:p-5">
                      <span className="w-full flex items-center justify-between">
                        <h5 className={`text-[13px] sm:text-[14px]`}>
                          {date.date}
                        </h5>
                        <h5 className={`text-[13px] sm:text-[14px]`}>
                          {date.time}
                        </h5>
                      </span>

                      <span className="relative overflow-hidden rounded-full h-17 w-17">
                        <Image src={item.img} alt={item.appointment_date.toString()} fill className="object-cover" />
                      </span>

                      <div className="w-full flex flex-col items-center gap-2 md:gap-3">
                        <p className={`text-[13px] font-medium `}>
                          {item.registered_as}
                        </p>
                        <p className={`text-[14px] `}>
                          Dr {item.last_name} {item.first_name}
                        </p>
                        <p
                          className={`block md:hidden text-[14px] `}
                        >
                          {item.languages_spoken}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`h-[50px] w-full flex items-center gap-3 border-t  group-hover:border-blue-400 border-gray-200
                      `}>
                      {ind % 2 === 1 ? (
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

                  <div className="w-full md:hidden">
                    <Drawer>
                      <DrawerTrigger className="w-full">
                        <div
                          key={ind}
                          className={`w-full flex flex-col font-mont rounded-lg box-shadow-1 duration-300 ${
                            appointments_within_24hrs ? 'bg-[#306ce9] duration-300' : 'bg-white shadow-md  hover:translate-y-1 group'
                          }`}
                        >
                          <div key={ind} className="w-full min-h-[240px] flex flex-col items-center gap-7 p-3 sm:p-5">
                            <span className="w-full flex items-center justify-between">
                              <h5 className={`text-[13px] sm:text-[14px]`}>
                                {date.date}
                              </h5>
                              <h5 className={`text-[13px] sm:text-[14px]`}>
                                {date.time}
                              </h5>
                            </span>

                            <span className="relative overflow-hidden rounded-full h-17 w-17">
                              <Image src={item.img} alt={item.appointment_date.toString()} fill className="object-cover" />
                            </span>

                            <div className="w-full flex flex-col items-center gap-2 md:gap-3">
                              <p className={`text-[13px] font-medium `}>
                                {item.registered_as}
                              </p>
                              <p className={`text-[14px] `}>
                                Dr {item.last_name} {item.first_name}
                              </p>
                              <p
                                className={`block md:hidden text-[14px] `}
                              >
                                {item.languages_spoken}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`h-[50px] w-full flex items-center gap-3 border-t ${
                              appointments_within_24hrs ? 'text-white border-blue-400' : 'border-gray-200'
                            }`}
                          >
                            {ind % 2 === 1 ? (
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
                      </DrawerTrigger>

                      <DrawerContent className="p-5 font-mont">
                        <DrawerHeader>
                          <DrawerTitle>{"Doctor's Information"}</DrawerTitle>
                        </DrawerHeader>
                        <div className="w-full flex items-center justify-start gap-5 p-5 relative rounded-lg">
                          <span className="h-[225px]">
                            <Image src={item.img} alt="profile-img" fill className="rounded-lg object-cover" />
                          </span>
                        </div>

                        <div className="w-full flex flex-col gap-2 mt-5">
                          <span className="flex w-full gap-2 items-center justify-start">
                            <p className="text-[13px] font-medium">{"Doctor's Name:"}</p>
                            <p className="text-[13px]">Dr. {item.first_name} {item.last_name}</p>
                          </span>
                          <span className="flex w-full gap-2 items-center justify-start">
                            <p className="text-[13px] font-medium">{"Doctor's Speciality:"}</p>
                            <p className="text-[13px]">{item.registered_as}</p>
                          </span>
                          <span className="flex w-full gap-2 items-center justify-start">
                            <p className="text-[13px] font-medium">Language:</p>
                            <p className="text-[13px]">{item.languages_spoken}</p>
                          </span>
                          <DrawerDescription className="text-black flex flex-col gap-2">
                            <span className="flex w-full gap-2 items-center justify-start">
                              <span className="text-[13px]">{item.description}</span>
                            </span>
                          </DrawerDescription>

                          <div className="w-full flex items-center justify-end gap-5 h-[40px] mt-5">
                            <DrawerClose className="h-full bg-[#f2f2f2] hover:bg-[#f2f2f2]/90 duration-300 font-mont rounded-sm px-5 text-[13px]">
                              Cancel
                            </DrawerClose>
                            <button className="h-full bg-[#306ce9] hover:bg-[#306ce9]/90 duration-300 font-mont rounded-sm px-5 text-white text-[13px]">
                              Start Consultation
                            </button>
                          </div>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Pagination */}
      {filteredAppointments.length > 0 && (
        <div className="w-full sm:px-5 flex items-center justify-center gap-4 pt-4 border-t border-gray-300">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-2.5 bg-white border border-gray-500 rounded-full disabled:text-gray-500 text-[13px]"
          >
            Previous
          </button>
          <span className="text-[13px]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-7 py-2.5 bg-white border border-gray-500 rounded-full disabled:text-gray-500 text-[13px]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointments;