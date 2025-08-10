import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingConsultDoctor = () => {
    return (
        <div className='w-full min-h-[calc(100vh-70px)] bg-gray-50 p-5 hide-scrollbar flex flex-col gap-5 font-mont'>
            

            <div className=" flex flex-col gap-5 ">
                <p className="text-lg font-semibold">Consultation with doctors</p>

                <Skeleton className='w-[250px] h-[50px] bg-gray-300 rounded-sm' />

                <div className="w-full temp-240 gap-5">
                    {
                        [1,2,3,4,5,6,7,8].map((data,ind:number)=>{
                            return(
                                <Skeleton key={ind} className='w-full h-[250px] rounded-md bg-gray-300 ' />
                                
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default LoadingConsultDoctor