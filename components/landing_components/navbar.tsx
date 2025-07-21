'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {landing_navbar_data} from '@/constants/index'
import MobileSidebar from '@/components/landing_components/mobile_sidebar'



const Navbar = () => {
    const [is_scroll, setIs_scroll] = useState(false)
    const [show_side_nav, setShow_side_nav] = useState(false)
    
    useEffect(() => {

        const handleScroll = () => {
            setIs_scroll(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    return (
        <div className='w-full relative'>
            <section className={show_side_nav ? ` show-side-bar`: 'hide-side-bar'}>
                <MobileSidebar setShow_side_nav={setShow_side_nav} />
            </section>

            <div className="fixed mx-auto overflow-hidden top-0 right-0 h-[100vh] w-[90%] -z-10 translate-y-[-80%] ">
                <Image src={'/header-bg-color.png'} alt='header bg color' fill={true} objectFit='contain'  className='w-full' />
            </div>
            
            <nav className={`navbar px-[0.75rem] py-[1rem] md:px-[2rem]  ${is_scroll ? 'scrolled ' : 'default '}`}>

                <div className=" w-full nav-cont flex items-center justify-between ">
                    
                    <Link href={'/'} className="xl:w-[250px] flex justify-start items-end ">
                        <p className="text-lg md:text-xl font-mont font-semibold ml-3">EPulse</p>
                        <span className="relative overflow-hidden h-[15px] w-[15px] mb-[5px]">
                            <Image src={'/icons/blue-dot.png'} alt='red-dot' layout='fill' objectFit='cotain' />
                        </span> 
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
                        

                        <Link href={'/login'} className="hidden rounded-full md:flex items-center justify-center gap-3 px-7 lg:px-10 py-2 text-white bg-[#306CE9] text-[15px] font-mont whitespace-nowrap">
                            Get Started
                            <span className="hidden relative overflow-hidden h-2 w-2 lg:flex items-center">

                                {/* <Image src={'/'} alt='greated than sign' objectFit='contain' layout='fill' /> */}
                            </span>
                        </Link>

                        <button className="md:hidden relative overflow-hidden flex h-[18px] w-[18px] md:h-[20px] md:w-[22px] " onClick={()=> setShow_side_nav(!show_side_nav)}>
                            <Image src={!show_side_nav ? '/icons/menu-black.png' : '/icons/close-black.png'} alt='menu' objectFit='contain' layout='fill' />
                        </button>
                    </span>
                </div>
            </nav>
        </div>
    )
}

export default Navbar