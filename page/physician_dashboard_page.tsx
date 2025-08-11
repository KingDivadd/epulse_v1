'use client'
import React, { useEffect, useState } from 'react'
import AdminWalletFundCont from '@/components/physician_wallet_fund_cont'
import DashboardAppointment from '@/components/dashboard_appointments'
import WalletFundHistory from '@/components/wallet_fund_history'
import AdminAppointmentSchedule from '@/components/physician_appointment_schedule'
import { useChat } from '@/app/context/ChatContext'
import { AppointmentProps } from '@/types'
import { get_auth_request } from '@/app/api'
import { toast_msg } from '@/lib/toast'
import { AxiosResponseHeaders } from 'axios'



const AdminDashboardPage = () => {
    const {user_information, setWallet_information, wallet_information,} = useChat()
    const [fund_search, setFund_search] = useState('')
    const [loading, setLoading] = useState(true)
    const [appointemnt_page_number, setAppointemnt_page_number] = useState(1)
    const [appointment_items_per_page, setAppointment_items_per_page] = useState(10)
    const [appointment_info, setAppointment_info] = useState<AppointmentProps>({appointments: [], accepted_appointment: 0, completed_appointment: 0, pending_appointment: 0, total_number_of_appointments: 0, total_number_of_pages: 0})
    const [appointment_taken, setAppointment_taken] = useState(0)
    const [pending_appointment, setPending_appointment] = useState(0)

    useEffect(() => {
        fetch_physician_dashboard_info(appointemnt_page_number, appointment_items_per_page)
    }, [])

    const fetch_physician_dashboard_info = async (page_number:number, limit:number) => {
        try {
            
            if (!navigator.onLine) {

                toast_msg({title: 'Not connected to the internet!', type: 'danger'})

                setTimeout(() => {
                    fetch_physician_dashboard_info(appointemnt_page_number, appointment_items_per_page)
                }, 3000);
                
                return;
            }

            const res = await get_auth_request(`auth/physician-dashboard/${page_number}/${limit}`) as AxiosResponseHeaders

            if (res.status == 200 || res.status == 201) {

                console.log(res.data.data)

                setLoading(false)

                const {wallet_balance, total_amount_credited, total_amount_debited,
                total_number_of_appointments, total_number_of_pages, appointments, appointments_taken, pending_appointment} = res.data.data
                
                setWallet_information({...wallet_information, total_amount_credited, wallet_balance, total_amount_debited, })
                setAppointment_info({...appointment_info, total_number_of_appointments, total_number_of_pages, appointments})
                setPending_appointment(pending_appointment)
                setAppointment_taken(appointment_taken)

            }
            
        } catch (err) {
            console.log('Error fetching physician info ', err)
        }
    }


    return (
        <div className="w-full min-h-[calc(100vh-70px)] bg-gray-50 p-5 hide-scrollbar flex flex-col gap-5">
            <AdminWalletFundCont appointment_taken={appointment_taken} pending_appointment={pending_appointment} />


            <div className="w-full bg-white flex flex-col gap-3.5 p-4 pb-2 rounded-md shadow-md">
                <p className="text-[14.5px] sm:text-[15.5px] font-medium font-mont">Appointment Schedule</p>

                <AdminAppointmentSchedule fund_search={fund_search} setFund_search={setFund_search} appointment_info={appointment_info}  setAppointment_info={setAppointment_info} loading={loading} setLoading={setLoading} page_number={appointemnt_page_number} setPage_number={setAppointemnt_page_number} />
            </div>
        </div>
    )
}

export default AdminDashboardPage