import React from 'react'
import Image from 'next/image'


const SectionTitle = ({title, add}:{title:string, add?:string}) => {
    return (
        <span className={`${add} bg-white py-1.5 px-7 md:py-2 md:px-10 flex items-center justify-center gap-2 box text-md md:text-lg font-mont rounded-full shadow-md border border-slate-200`}>
            <span className="relative overflow-hidden h-4 w-4">
                <Image src={'/icons/blue-dot.png'} alt='dot' layout='fill' objectFit='contain'  />
            </span>

            {title}
        </span>
    )
}

export default SectionTitle