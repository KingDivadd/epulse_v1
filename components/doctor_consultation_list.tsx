
'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { registered_doctors } from '@/constants';
import { useChat } from '@/app/context/ChatContext';
import { useRouter } from 'next/navigation';
import { toast_msg } from '@/lib/toast';
import { convert_to_unix } from '@/lib/date_formater';
import { Loader2Icon } from 'lucide-react';
import { get_auth_request, post_auth_request } from '@/app/api';
import { AxiosResponseHeaders } from 'axios';


interface DoctorProps {
    physician_id: string;
    first_name: string;
    last_name: string;
    country: string;
    languages_spoken: string[];
    avatar: string;
    registered_as: string;
    specialty: string;
    description: string;
    current_hospital_or_clinic: string;
}

const DoctorConsultationList = () => {
    const [loading, setLoading] = useState(true);
    const [loading_2, setLoading_2] = useState(false)
    const { selected_user, setSelected_user, setRoute } = useChat();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [new_appointment, setNew_appointment] = useState({physician_id:'', appointment_type:'', mode_of_consult:'virtual', complain:'', time:0})
    const [selected_time, setSelected_time] = useState('')
    const [selected_date, setSelected_date] = useState('')

    useEffect(() => {
        if (selected_date && selected_time) {
            const date_time = `${selected_date} ${selected_time}`
            const unix_date_time = convert_to_unix(date_time)
            console.log('unix date time ..... ',unix_date_time)
            setNew_appointment({...new_appointment, time:unix_date_time})
        }
    
    }, [selected_date, selected_time])

    // Generate time slots at 30-minute intervals
    const timeSlots = Array.from({ length: 48 }, (_, i) => {
        const hours = Math.floor(i / 2);
        const minutes = i % 2 === 0 ? '00' : '30';
        const period = hours < 12 ? 'AM' : 'PM';
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${displayHours}:${minutes} ${period}`;
    });

    useEffect(() => {
        const path = window.location.pathname

        const list = path.split('/')

        const physician_url_id = list[list.length - 1]


        if (selected_user && selected_user.physician_id) {
            const {physician_id} = selected_user

            setTimeout(() => {
                setLoading(false)
                setNew_appointment({...new_appointment, physician_id})
            }, 100);
        }else{
            // router.push('/doctors')
            handle_verify_physician_id(physician_url_id)
        }
    }, [])

    async function handle_verify_physician_id(id:string) {

        try {

            const res = await get_auth_request(`auth/verify-physician-id/${id}`) as AxiosResponseHeaders;

            console.log(res)

            if (res.status == 200 || res.status == 201) {
                
                setLoading(false)

                setNew_appointment({...new_appointment, physician_id:id})

                setSelected_user(res.data.physician)
                
            }else if(res.status == 404){

                router.push('/doctors')

            }else if(res.status == 401){

                toast_msg({title:'Session expired, kindly login again'})

                router.push("/login")
            }else{
                toast_msg({title: res.response.data.msg, type: 'danger'})

                setTimeout(() => {
                    handle_verify_physician_id(id)
                }, 3000);
            }
            
        } catch (err) {
            console.log('Error verifying physician id ',err)
        }
        
    }

    const handle_submit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading_2(true)

        console.log(new_appointment)

        try {
            
            if (!navigator.onLine) return toast_msg({title: 'Not connected to the internet'});

            const res = await post_auth_request(`auth/create-appointment`, new_appointment) as AxiosResponseHeaders

            console.log(res)

            if (res.status == 200 || res.status == 201) {
                
                toast_msg({title: `Appointment booked successfully`, })

                setLoading_2(false)

                setTimeout(() => {

                    router.push('/appointments')

                    setRoute('appointments')

                }, 2000);
            }else if (res.status == 401){

                toast_msg({title: 'Session expired, kindly login again to continue'})

            }else if (res.status == 500){

                toast_msg({title: res.response.data.msg})

                setTimeout(() => {
                    router.refresh()
                }, 2000);
            }else{

                toast_msg({title: res.response.data.msg})

            }

        } catch (err) {
            console.log(err)
        }finally{
            setLoading_2(false)
        }
    };

    if (loading) {
        return (
        <div className="w-full h-[80vh] flex items-center justify-center ">
            <Loader2Icon className='w-8 h-8 text-gray-500 animate-spin' />
        </div>
        );
    }

    if (error || !selected_user) {
        return (
        <div className="w-full h-[80vh] flex items-center justify-center ">
            <p className="text-[15.5px] font-medium font-mont text-red-500">{error || 'Doctor not found'}</p>
        </div>
        );
    }

    return (
        <div className="w-full">
            <Link href={`/doctors`} className="px-3 sm:px-5 text-[13px] text-[#306ce9] flex items-center justify-start font-medium gap-1" >
                <IoArrowBackOutline size="18px" /> Back
            </Link>

                <div className="w-full flex flex-col gap-3 mt-5 px-3 sm:px-5">
                    <h3 className="font-medium text-[14px] text-start">Select the date and time you would like to have your appointment.</h3>
                    <h3 className="text-[13px] text-start">Please note that appointments can only be selected at 30-minute intervals.</h3>

                    <form onSubmit={handle_submit} className="flex flex-col gap-8 p-5 rounded-md shadow-md bg-white w-full">
                        <span className="w-full flex flex-col gap-2 ">
                            <p className="text-[13px] ">Mode of Consultation</p>
                            <select
                                name="appointment_type"
                                id="appointment_type"
                                className="h-[50px] w-full border border-slate-400 bg-white px-3 text-[13px] rounded-[4px]"
                                onChange={(e)=> setNew_appointment({...new_appointment, appointment_type:e.target.value.toLowerCase()})}>
                                <option value="" className='text-[14px]'>Select</option>
                                <option value="video_call" className='text-[14px]'>Video</option>
                                <option value="chat" className='text-[14px]'>Chat</option>
                            </select>
                        </span>

                        <span className="w-full flex flex-col gap-2 ">
                            <p className="text-[13px]">Date for Consultation</p>
                            <input type="date" name="date" id="date" onChange={(e)=> setSelected_date(e.target.value)} className="h-[50px] border border-slate-400 px-3 rounded-[4px] w-full text-[13px]" />
                        </span> 

                        <span className="w-full flex flex-col gap-2 ">
                            <p className="text-[13px]">Time for Consultation</p>
                            <select
                                name="time"
                                id="time"
                                className="h-[50px] w-full border border-slate-400 bg-white px-3 rounded-[4px] text-[13px]"
                                onChange={(e)=> setSelected_time(e.target.value)}
                            >
                                {timeSlots.map((time) => (
                                    <option key={time} value={time} className='text-[14px]'>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </span>

                        <span className="w-full flex flex-col gap-2 ">
                            <p className="text-[13px]">Complaint Brief</p>
                            <textarea
                                placeholder="A brief description of your complaint..."
                                name="complaint"
                                id="complaint"
                                className="w-full h-[100px] border border-slate-400 px-3 py-2 rounded-[4px] resize-none text-[13px]"
                                onChange={(e)=> setNew_appointment({...new_appointment, complain:e.target.value})}
                            ></textarea>
                        </span>

                        <button type="submit" className="h-[50px]  rounded-sm text-white bg-[#306ce9] hover:bg-[#306ce9]/90 duration-300 text-[13px] flex items-center justify-center" onClick={handle_submit} > 
                                {loading_2? <Loader2Icon className='animate-spin size-8 ' />:"Book Appointment"}
                        </button>
                    </form>
                </div>
        </div>
    )
}

export default DoctorConsultationList