'use client'
import { useChat } from '@/app/context/ChatContext'
import { landing_navbar_data } from '@/constants'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios, { AxiosResponseHeaders } from 'axios'
import {get_request} from '@/app/api/index'
import { toast_msg } from '@/lib/toast'


const MobileNavbar = () => {
    const router = useRouter()
    const {setShow_mobile_nav, show_mobile_nav} = useChat()

    function handle_get_started() {
        const auth_id = localStorage.getItem('x-id-key')
        if (!auth_id || auth_id == null) {
            return router.push('/signup-type')
        }else{
            return router.push('/login')
        }
    }

    async function handle_submit(e:React.FormEvent) {
        e.preventDefault();

        toast_msg({title: 'fetch started'})
        try {
            const res = await get_request(`test/test-db-connection`) as AxiosResponseHeaders

            if( res.status == 200 || res.status == 201){
                toast_msg({title: res.data.msg})
            }

            console.log(res)
        } catch (error) {

            toast_msg({title: 'Error fetching data'})
            console.log()
        }
    }

    return (
        <div className="w-full h-full p-5 flex flex-col font-mont">
            {
                landing_navbar_data.map((data,ind:number)=>{
                    const {icon, id, title} = data
                    return(
                        <Link href={id} key={ind} className="w-full h-[45px] flex items-center justify-center hover:bg-[#306ce9]/90" onClick={()=>setShow_mobile_nav(!show_mobile_nav)}>
                            <p className="text-white group text-[13px] font-medium">{title}</p>
                        </Link>
                    )
                })
            }

            <button className="mt-5 h-[40px] w-[70%] bg-white rounded-full mx-auto text-[13px] font-medium" onClick={handle_get_started}>Get Started</button>

            {/* <button className="mt-5 h-[40px] w-[70%] bg-blue-400 rounded-md mx-auto text-[13px] font-medium" onClick={handle_submit}>Get Started</button> */}


        </div>
    )
}

export default MobileNavbar