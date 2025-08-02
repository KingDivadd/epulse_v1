'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import Image from 'next/image'


const LoadingWallet = () => {
    return (
        <div className='w-full min-h-[calc(100vh-70px)] bg-gray-100 p-5 hide-scrollbar flex flex-col gap-5 font-mont'>
            <div className="w-full flex items-center justify-between gap-5 ">
                <div className="bg-[#306ce9] h-[250px] flex-1 shadow-md rounded-md flex items-center justify-center relative">
                    <span className="w-full h-200px">
                        <Image src={'/wallet-img-1.jpg'} alt='wallet img ' fill objectFit='cover' className='rounded-md' />
                    </span>
                    
                </div>
                <div className="md-[250px] lg:w-[300px] xl:w-[350px] min-h-[250px] rounded-md shadow-md bg-white p-5  flex flex-col gap-7">
                    <p className="text-lg font-semibold">Overview</p>
                    <Skeleton className="w-full h-[150px]  bg-gray-300" />
                </div>
            </div>

            <div className="min-h-[450px] w-full flex-col justify-between flex rounded-md bg-white shadow-md p-5 gap-5 ">
                <p className="text-lg font-semibold">Transactions</p>

                <div className="w-full flex-1 flex flex-col gap-1">

                    {
                        [1,2,3,4,5,6,7].map((data,ind)=>{
                            return(
                                <Skeleton key={ind} className='w-full h-[50px] rounded-none bg-gray-300' />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default LoadingWallet