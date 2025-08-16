'use client'
import React, {useEffect, useState} from 'react'
import ChatList from '@/components/chat_list'
import SelectedChat from '@/components/selected_chat'
import { toast_msg } from '@/lib/toast'
import { get_auth_request } from '@/app/api'
import { AxiosResponseHeaders } from 'axios'
import { useRouter } from 'next/navigation'
import { useChat } from '@/app/context/ChatContext'
import { AppointmentType } from '@/types'


const ConsultationPage = () => {
    const router = useRouter()
    const {user_information, selected_appointment_info, appointment_info, setAppointment_info, setChat_list, chat_list} = useChat()
    const [loading, setLoading] = useState(true)
    const [loading_2, setLoading_2] = useState(true)
    const [receiver_img, setReceiver_img] = useState('')
    const [show_list, setShow_list] = useState(true)


    useEffect(() => {
        fetch_user_chat()
    }, [])

    async function fetch_user_chat() {

        try {

            if (!navigator.onLine) return toast_msg({type:'danger', title:'Please connect to the internet and try again!'});

            const res = await get_auth_request(`auth/appointment-available-for-consultation`) as AxiosResponseHeaders

            if (res.status == 200 || res.status == 201) {

                setLoading(false)
                
                setAppointment_info(res.data.appointments)

            }else if (res.status == 500){
                setTimeout(() => {
                    fetch_user_chat()
                }, 2000);
            }
            else if (res.status == 401){

                toast_msg({title: 'Session expired, kindly login again to continue!'})

                router.push('/login')
            }else{
                toast_msg({type:'danger', title: res.response.data.msg})
            }
            
        } catch (err) {
            console.log(err)
        }
        
    }

    useEffect(() => {

        const chat_route = sessionStorage.getItem('s-c')

        if (selected_appointment_info){

            handle_fetch_chat_data()
        }
        else if (chat_route) {
            
            handle_fetch_chat_data(chat_route)

        }


    }, [selected_appointment_info])

    async function handle_fetch_chat_data(passed_route?:string) {
        
        try {


            const route = selected_appointment_info ? `${selected_appointment_info.patient.patient_id}/${selected_appointment_info.physician.physician_id}` : passed_route

            const res = await get_auth_request(`auth/get-chats/${route}`) as AxiosResponseHeaders

            if (res.status == 200 || res.status == 201) {

                setChat_list(res.data.chats)
                
                setLoading_2(false)

            }else if(res.status == 401){

                return toast_msg({title: 'Session expired, kindly login again'})

            }
            else{

                return toast_msg({title: res.response.data.msg, type:'danger'})

            }

        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div className='p-5 min-h-[calc(100vh-70px)] w-full grid grid-cols-7 gap-5 bg-gray-50 font-mont '>
            <div className="col-span-7 lg:col-span-3 h-full overflow-y-auto relative rounded-md  hide-scrollbar  ">
                <ChatList loading={loading} setLoading={setLoading} loading_2={loading_2} setLoading_2={setLoading_2} receiver_img={receiver_img} setReceiver_img={setReceiver_img} show_list={show_list} setShow_list={setShow_list} />
            </div>

            <div className="hidden lg:block lg:col-span-4 h-full">
                <SelectedChat loading_2={loading_2} receiver_img={receiver_img} setReceiver_img={setReceiver_img} setLoading_2={setLoading_2} show_list={show_list} setShow_list={setShow_list} />
            </div>
        </div>
    )
}

export default ConsultationPage