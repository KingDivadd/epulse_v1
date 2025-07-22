import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { footer_list } from '@/constants'

const Footer = () => {
    return (
        <footer className="w-full rounded-t-xl bg-[#101010] min-h-[50vh] px-[1rem] sm:px-[2rem] md:px-[4rem] py-[2rem] flex flex-col items-center justify-between gap-15 ">
            <section className="w-full flex max-xl:flex-wrap items-center justify-between gap-10">

                <div className="flex flex-col justify-between items-center sm:items-start w-full xl:w-1/2">

                    <p className="text-3xl w-[90%] md:w-[80%] text-[#ffffff] max-sm:text-center font-semibold font-mont leading-[45px] ">Seamless Healthcare, Anytime, Anywhere.</p>

                    <p className="text-md w-[85%] md:w-[75%] lg:w-[65%] max-sm:text-center  text-start text-slate-200 mt-5 font-mont leading-[30px]">Manage your health effortlessly in one app. Consult doctors, order medications, and access various healthcare services at your fingertips.</p>

                </div> 

                <div className="w-full xl:w-1/2 flex flex-wrap max-sm:justify-center items-start justify-between gap-5 whitespace-nowrap">
                    {
                        footer_list.map((data, ind)=>{
                            return(
                                <span className="flex flex-col gap-4 max-sm:justify-center" key={ind}>
                                    <p className="text-[#ffffff] text-[15px] font-[500] max-sm:text-center ">{data.title}</p>

                                    {
                                        data.items.map((item, index)=>{
                                            return(
                                                <p className="text-[14px] text-slate-300 max-sm:text-center" key={index}>{item}</p>
                                            )
                                        })
                                    }
                                </span>
                            )
                        })
                    }
                </div>


            </section>

            

            <div className="w-full p-5  min-h-[50px] rounded-full flex flex-wrap gap-5 items-center justify-between max-md:justify-center bg-[#306CE9] ">
                <p className="text-[14px] text-[#ffffff] ">© EPulse 2025, All right reserved</p>

                <span className="flex flex-wrap max-md:justify-center items-center justify-between gap-5">

                    {
                        ['facebook', 'instagram', 'twitter', 'linkedIn'].map((icon, index) => {
                            return (
                                <Link href={'/'} key={index} className="text-sm text-white font-mon">{icon}</Link>
                            )
                        })
                    }

                </span>
            </div>


        </footer>
    )
}

export default Footer