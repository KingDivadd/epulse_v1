'use client'
import React, { useEffect, useState } from 'react'
import WalletFundCont from '@/components/wallet_fund_cont'
import DashboardAppointment from '@/components/dashboard_appointments'
import WalletFundHistory from '@/components/wallet_fund_history'
import WalletFundHistoryTable from '@/components/wallet_fund_history_table'
import { toast_msg } from '@/lib/toast'
import { get_auth_request } from '@/app/api'
import { AxiosResponseHeaders } from 'axios'
import { useRouter } from 'next/navigation'
import { useChat } from '@/app/context/ChatContext'
import { AppointmentProps } from '@/types'


const DashboardPage = () => {
    const {setWallet_information, wallet_information, page_number, items_per_page, } = useChat()
    const router = useRouter()
    const [fund_search, setFund_search] = useState('')
    const [loading, setLoading] = useState(true)
    const [appointemnt_page_number, setAppointemnt_page_number] = useState(1)
    const [appointment_items_per_page, setAppointment_items_per_page] = useState(10)
    const [trigger_refresh, setTrigger_refresh] = useState(false)

    const [pagination, setPagination] = useState({page_number: 1, page_number_1:1, items_per_page:10, items_per_page_1:10})

    const [appointment_info, setAppointment_info] = useState<AppointmentProps>({appointments: [], accepted_appointment: 0, completed_appointment: 0, pending_appointment: 0, total_number_of_appointments: 0, total_number_of_pages: 0})

    useEffect(() => {
        fetch_patient_dashboard_info(appointemnt_page_number, appointment_items_per_page, page_number, items_per_page)
    }, [page_number, appointemnt_page_number])

    const fetch_patient_dashboard_info = async (page_number:number, limit:number, page_number_1:number, limit_1:number) => {
        
        try {

            if (!navigator.onLine) {

                toast_msg({title: 'Not connected to the internet!', type: 'danger'})

                setTimeout(() => {
                    fetch_patient_dashboard_info(pagination.page_number, pagination.items_per_page, pagination.page_number_1, pagination.items_per_page_1)
                }, 3000);
                
                return;
            }

            const res = await get_auth_request(`auth/patient-dashboard/${page_number}/${limit}/${page_number_1}/${limit_1}`) as AxiosResponseHeaders

            if (res.status == 200 || res.status == 201) {

                setLoading(false)

                const {wallet_balance, total_amount_credited, total_amount_debited,
                total_number_of_appointments, total_number_of_pages, appointments,
                total_number_of_transactions, total_number_of_pages_1, transactions} = res.data.data

                setWallet_information({...wallet_information, total_amount_credited, total_amount_debited, total_number_of_pages:total_number_of_pages_1, total_number_of_transactions, transactions, wallet_balance})

                setAppointment_info({...appointment_info, total_number_of_appointments, total_number_of_pages, appointments})
                
            }else if(res.status == 401){
                
                toast_msg({title: 'Session expired, kindly login again'})

                router.push('/login')
            }else{

                toast_msg({title: res.response.data.msg})

            }
            
        } catch (err) {
            console.log('Error fetching patient dashboard ', err)
        }finally{
            setLoading(false)
        }

    }

    return (
        <div className="w-full min-h-[calc(100vh-70px)] bg-gray-50 p-5 hide-scrollbar flex flex-col gap-5">
            <WalletFundCont trigger_refresh={trigger_refresh} setTrigger_refresh={setTrigger_refresh} />

            <DashboardAppointment appointment_info={appointment_info}  setAppointment_info={setAppointment_info} loading={loading} setLoading={setLoading} page_number={appointemnt_page_number} setPage_number={setAppointemnt_page_number} />

            <div className="w-full bg-white flex flex-col gap-5 p-4 pb-2 rounded-md shadow-md">
                <p className="text-[15.5px] font-medium font-mont">Transactions</p>

                <WalletFundHistoryTable fund_search={fund_search} setFund_search={setFund_search} loading={loading} setLoading={setLoading} />
            </div>

        </div>
    )
}

export default DashboardPage