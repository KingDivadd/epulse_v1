'use client'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingConsultation = () => {
    return (
        <div className='w-full min-h-[calc(100vh-70px)] bg-gray-50 p-5 hide-scrollbar grid grid-cols-7 gap-5 font-mont'>
            <div className="col-span-7 lg:col-span-3 flex flex-col gap-5">
                <p className="text-lg font-semibold">Consultation with doctors</p>

                
                <div className="w-full max-h-[calc(100vh-160px)]  overflow-y-auto hide-scrollbar">
                    <div className="w-full h-full flex flex-col gap-2">
                        {
                            [1,2,3,4,5,6,7,8].map((data, ind)=>{
                                return(
                                        <span className="flex h-[100px] items-center justify-between gap-3 p-5 bg-white rounded-md shadow-md">
                                            <Skeleton className='w-[50px] h-[50px] rounded-full bg-gray-300 ' />

                                            <span className="h-full flex-1 flex-col items-start justify-center flex gap-1  ">
                                                <Skeleton className='w-[60%] h-[15px] bg-gray-300 ' />
                                                <Skeleton className='w-[95%] rounded-sm h-[25px] bg-gray-300 ' />
                                            </span>
                                        </span>
                                )
                            })
                        }
                    </div>

                </div>

            </div>

            <div className="hidden col-span-4 h-full lg:flex flex-col justify-between bg-white rounded-md shadow-md py-5">
                <div className="w-full flex items-center justify-between px-5 border-b border-gray-200 pb-5">
                    <span className="flex items-center gap-2">
                        <Skeleton className='w-[45px] h-[45px] bg-gray-300 rounded-full' />

                        <Skeleton className='w-[120px] h-[15px] bg-gray-300 ' />
                    </span>

                    <Skeleton className='w-[150px] h-[45px] bg-gray-300 rounded-sm ' />
                </div>

                <div className="w-full flex-1 "></div>

                <span className="w-full flex min-h-[45px] items-center justify-between px-5 gap-0.5 pt-5">
                    <Skeleton className='flex-1 h-[45px] bg-gray-300 rounded-sm' />
                    <Skeleton className='w-[50px] h-[45px] bg-gray-300 rounded-sm' />
                </span>
            </div>

        </div>
    )
}

export default LoadingConsultation