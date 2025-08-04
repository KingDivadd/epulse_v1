'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {landing_navbar_data} from '@/constants/index'
import { useChat } from '@/app/context/ChatContext'
import { FaCaretRight } from "react-icons/fa";
import { useRouter } from 'next/navigation'


const Navbar = () => {
    const {show_mobile_nav, setShow_mobile_nav} = useChat()
    const [is_scroll, setIs_scroll] = useState(false)
    const router = useRouter()
    
    useEffect(() => {

        const handleScroll = () => {
            setIs_scroll(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    function handle_get_started() {
        const auth_id = localStorage.getItem('x-id-key')
        if (!auth_id || auth_id == null) {
            return router.push('/signup-type')
        }else{
            return router.push('/login')
        }
    }


    return (
        <div className='w-full relative'>

            {/* <div className="fixed mx-auto overflow-hidden top-0 right-0 h-[100vh] w-[90%] -z-10 translate-y-[-80%] ">
                <Image src={'/header-bg-color.png'} alt='header bg color' fill={true} objectFit='contain'  className='w-full' />
            </div> */}
            
            <nav className={`navbar px-[0.75rem] py-[1rem] md:px-[2rem]  ${is_scroll ? 'scrolled ' : 'default '}`}>

                <div className=" w-full nav-cont flex items-center justify-between bg-white/60 ">
                    
                    <Link href={'/'} className="xl:w-[250px] flex justify-start items-end ">
                        <p className="text-lg md:text-xl font-mont font-semibold ">ePulse</p>
                    </Link>

                    <span className={`max-md:hidden flex gap-8 rounded-full px-5 lg:px-12 py-3 items-center justify-center h-[70%] duration-300; `}>

                        {
                            landing_navbar_data.map((data:{title:string, id:string}, ind:number)=>{
                                const {title, id} = data
                                return(
                                    <Link key={ind} href={id} className="text-[#2F2F2F] text-[13px] whitespace-nowrap font-semibold font-mont">{title}</Link>
                                )
                            })
                        }
                    </span>

                    <span className=" xl:w-[250px] sm:flex items-center justify-end gap-5 sm:gap-3 ">
                        

                        <button className="hidden rounded-full md:flex items-center justify-center gap-1 px-7 lg:px-10 py-2 text-white bg-[#306CE9] text-[13px] font-mont whitespace-nowrap" onClick={handle_get_started} >
                            Get Started

                            <FaCaretRight size={'18px'} />
                            
                        </button>

                        <button className="md:hidden relative overflow-hidden flex h-[18px] w-[18px] md:h-[20px] md:w-[22px] " onClick={()=> {setShow_mobile_nav(!show_mobile_nav); }}>
                            <Image src={'/icons/menu-black.png'} alt='menu' objectFit='contain' layout='fill' />
                        </button>
                    </span>
                </div>
            </nav>
        </div>
    )
}

export default Navbar