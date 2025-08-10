'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from 'react-day-picker'

const LoadingAppointment = () => {
    const [position, setPosition] = useState('')

    return (
        <div className='w-full min-h-[calc(100vh-70px)] bg-gray-50 p-5 hide-scrollbar flex flex-col gap-5 font-mont'>
            <div className="w-full gap-5 temp-240">
                {
                    [1,2,3,4].map((data,ind:number)=>{
                        return(
                            <div key={ind} className="w-full min-h-100px bg-white rounded-md shadow-md p-5 flex items-center gap-5 justify-start">
                                <Skeleton className='w-[50px] h-[50px] bg-gray-300 rounded-full' />

                                <div className="h-full flex-1 flex flex-col items-start justify-center gap-1 5">
                                    <Skeleton className='w-full h-[15px] bg-gray-300 roundd-full' />
                                    <Skeleton className='w-[70%] h-[25px] bg-gray-300 roundd-full' />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="sm:bg-white sm:p-5 rounded-md sm:shadow-md flex flex-col gap-5 ">
                <p className="text-lg font-semibold">All Appointments</p>

                <Skeleton className='w-[250px] h-[50px] bg-gray-300 rounded-sm' />

                <div className="w-full temp-240 gap-5">
                    {
                        [1,2,3,4,5,6,7,8].map((data,ind:number)=>{
                            return(
                                <span key={ind} className="w-full h-[260px] bg-white rounded-md shadow-md flex flex-col justify-between items-center gap-3 py-4">
                                    <div className="w-full px-4 flex items-center justify-between">
                                        <Skeleton className='w-[70px] h-[15px] bg-gray-300 ' />
                                        <Skeleton className='w-[70px] h-[15px] bg-gray-300 ' />
                                    </div>

                                    <Skeleton className='w-[50px] h-[50px] bg-gray-300 rounded-full' />

                                    <div className="span w-full flex flex-col items-center justify-center gap-1">

                                        <Skeleton className='w-[60px] h-[15px] bg-gray-300 ' />
                                        <Skeleton className='w-[90px] h-[15px] bg-gray-300 ' />
                                    </div>

                                    <span className=" px-4 h-[50px] w-full border-t border-gray-200 flex items-center justify-center gap-0.5">
                                        <Skeleton className='w-[20px] h-[10px] bg-gray-300 ' />
                                        <Skeleton className='w-[60px] h-[15px] bg-gray-300 ' />
                                    </span>


                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default LoadingAppointment