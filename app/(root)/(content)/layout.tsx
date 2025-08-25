'use client'
import React, {useEffect, useState} from 'react';
import Sidebar from '@/components/sidebar';
import MobileSidebar from '@/components/mobile_sidebar';
import { useChat } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';
import axios, { AxiosResponseHeaders } from 'axios';
import { get_auth_request, post_auth_request } from '@/app/api';
import { toast_msg } from '@/lib/toast';
import {urlBase64ToUint8Array} from '@/lib/url_to_unit8_array'
import { io } from 'socket.io-client';
import { SocketType } from '@/types';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { show_mobile_sidebar, setShow_mobile_sidebar, setUser_information, user_information,  } = useChat();



    let count = 0



    useEffect(() => {
    
        if (!user_information?.role) {
            
            const x_id_key = localStorage.getItem('x-id-key')
            
            if (x_id_key) {
                
                handle_verify_status()

                setLoading(true)

                if (user_information && user_information?.role == 'physician'){

                    const {first_name, last_name, registered_as, specialty, avatar, bio, country, state, address, languages_spoken, medical_license} = user_information

                    if (!first_name || !last_name || !registered_as || !specialty || !bio || !avatar || !country || !state || !address || !languages_spoken || !medical_license){
                        router.push('/profile')
                    }

                }
                
            }else{
                
                localStorage.clear()
                
                router.push('/login')
            }
        }
        
    }, [user_information?.role])


    async function handle_verify_status() {

        if (count == 1 || count == 6){
            !navigator.onLine && toast_msg({title: "Please connect to the internet.", type: 'danger'})
        }

        try {

            const res = await get_auth_request('auth/user-information') as AxiosResponseHeaders

            if (res.status === 200 || res.status === 201) {

                handle_subscribe_user()
                
                const user_role = res.data.user.patient_id ? 'patient' : 'physician'

                setUser_information({...user_information, ...res.data.user, role: user_role })

                if (user_role == 'physician'){

                    const {first_name, last_name, registered_as, specialty, avatar, bio, country, state, address, languages_spoken, medical_license} = res.data.user

                    if (!first_name || !last_name || !registered_as || !specialty || !bio || !avatar || !country || !state || !address || !languages_spoken || !medical_license){
                        router.push('/profile')
                    }

                }

                setLoading(false)

                count = 0

            } else if (res.status == 401){
                toast_msg({title: 'Session expired please login again.', type:'danger'})
                router.push('/login')
            }
            
            else{
                
                if (count < 10){

                    count = count + 1

                    handle_verify_status(); 

                }else{
                    count = 0

                    setTimeout(() => {
                        
                        handle_verify_status(); 
                        
                    }, 10000);
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    async function handle_subscribe_user(){
        try {
            const sub = await subscribeUser()

            const res = await post_auth_request(`auth/save-subscription`, { subscription: sub }) as AxiosResponseHeaders

            if (res.status == 200 || res.status == 201){
                // console.log('sub added. ')
            }else{
                console.log(res)
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    const subscribeUser = async() => {
        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                throw new Error('Permission not granted for Notification');
            }

            const registration = await navigator.serviceWorker.register('/worker.js');

            const new_subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BAQTDYROjWk02zDRmK9d83aaS_GNOn_4BvbwPT4VQxIb9FEwbTgwHqQpXQQ55IwrsuSMVi8k63a4t6XGsNcY3oc')
            });

            return JSON.stringify(new_subscription)
        } catch (error) {
            console.error('Error during subscription:', error);
        }
    };

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
            
            <main className="w-screen h-screen flex overflow-hidden relative sm:p-0" onClick={handleOutsideClick}>
                <section className="hidden sm:block w-[250px]">
                    <Sidebar />
                </section>

                <section className="flex-1 h-full flex flex-col bg-[#ffffff] overflow-y-auto overflow-x-hidden">
                    {children}
                </section>

                <section
                    className={`absolute w-[275px] h-screen bg-white border-r border-[#f2f2f2] sm:hidden top-0 ${
                    show_mobile_sidebar ? 'left-0' : 'left-[-280px]'
                    } duration-300 ease-in-out z-10 flex items-start justify-between`}
                    onClick={handleMobileSidebarClick}>
                    <MobileSidebar />
                </section>
            </main>
            
            
        
        </>
    );
}