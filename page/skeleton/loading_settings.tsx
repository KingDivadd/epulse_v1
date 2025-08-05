'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import Image from 'next/image'


const LoadingSettings = () => {
    return (
        <div className='w-full min-h-[calc(100vh-70px)] bg-gray-100 p-5 hide-scrollbar flex flex-col gap-5 font-mont'>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <div className="col-span-1 flex flex-col items-center justify-between min-h-[550px] bg-white rounded-md shadow-md p-5">
                    <Skeleton className='w-[300px] h-[300px] bg-gray-300 rounded-full ' />

                    <div className="w-full flex flex-col gap-5">
                        <Skeleton className='w-full h-[50px] bg-gray-300 ' />
                        <Skeleton className='w-full h-[50px] bg-gray-300 ' />
                    </div>
                </div>

                <div className="col-span-1 flex flex-col items-center gap-5 min-h-[550px] bg-white rounded-md shadow-md p-5">
                    {
                        [1,2,3,4,5,6,7,8,].map((item,ind)=>{
                            return(
                                <Skeleton key={ind} className='w-full h-[50px] bg-gray-300 ' />

                            )
                        })
                    }
                </div>

                <div className="col-span-1 flex flex-col items-center gap-5 min-h-[550px] bg-white rounded-md shadow-md p-5">
                    {
                        [1,2,3,4,5,6,7,8,].map((item,ind)=>{
                            return(
                                <Skeleton key={ind} className='w-full h-[50px] bg-gray-300 ' />

                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default LoadingSettings