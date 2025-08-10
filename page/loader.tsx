'use client'
import React from 'react'
import {Loader2Icon} from 'lucide-react'

const Loader = () => {
    return (
        <div className="w-full flex items-center justify-center h-[calc(100vh-80px)] bg-gray-50">
            <Loader2Icon className='size-8 sm:size-10 animate-spin text-[#306ce9]' />
        </div>
    )
}

export default Loader