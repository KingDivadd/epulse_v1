'use client'
import React, {useEffect, useState} from 'react';
import Sidebar from '@/components/sidebar';
import MobileSidebar from '@/components/mobile_sidebar';
import { useChat } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';
import axios, { AxiosResponseHeaders } from 'axios';
import { get_auth_request } from '@/app/api';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter()
    const [begin_rendering, setBegin_rendering] = useState(false)
    const [count_retry, setCount_retry] = useState(0)


    const { show_mobile_sidebar, setShow_mobile_sidebar, setUser_information, user_information } = useChat();

    useEffect(() => {
    
        if (!user_information?.role) {
            const x_id_key = localStorage.getItem('x-id-key')
            if (x_id_key) {
                handle_verify_status()
            }else{
                localStorage.clear()
                router.push('/login')
            }
        }else{
            setBegin_rendering(true)
        }
        
    }, [])


    async function handle_verify_status() {
        
        try {

            const res = await get_auth_request('auth/user-information') as AxiosResponseHeaders

            if (res.status === 200 || res.status === 201) {
                
                const user_role = res.data.user.patient_id ? 'patient' : 'physician'

                setUser_information({...user_information, ...res.data.user, role: user_role })

                setBegin_rendering(true)
                
            }else{
                
                if (count_retry < 5){
                    handle_verify_status()
                    setCount_retry(count_retry + 1)
                }else{
                    console.log('waiting for 5sec begins now')
                    setTimeout(() => {
                        handle_verify_status()
                        console.log('waited for 5 secs, retry has started')
                    
                        setCount_retry(0)
                    }, 20000);
                }
                console.log('user-informatin-2 ',user_information)
            }

        } catch (err) {
            console.log(err);
        }
    }

    // Handler to close mobile sidebar when clicking outside
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (show_mobile_sidebar) {
            setShow_mobile_sidebar(false);
        }
    };

    // Handler to prevent clicks inside mobile sidebar from closing it
    const handleMobileSidebarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <>
            {true ? <main className="w-screen h-screen flex overflow-hidden relative sm:p-0" onClick={handleOutsideClick}>
                <section className="hidden sm:block w-[210px] xl:w-[250px]">
                    <Sidebar />
                </section>

                <section className="flex-1 h-full flex flex-col bg-[#ffffff] overflow-y-auto overflow-x-hidden">
                    {children}
                </section>

                <section
                    className={`absolute w-[250px] h-screen bg-white border-r border-[#f2f2f2] sm:hidden top-0 ${
                    show_mobile_sidebar ? 'left-0' : 'left-[-280px]'
                    } duration-300 z-10 flex items-start justify-between`}
                    onClick={handleMobileSidebarClick}>
                    <MobileSidebar />
                </section>
            </main>:
            <main className="w-screen h-screen flex items-center justify-center font-mont text-lg">
                Loading
            </main>
            
        }
        </>
    );
}