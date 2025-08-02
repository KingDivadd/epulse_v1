'use client'
import React, { useState } from 'react'
import AdminWalletFundCont from '@/components/physician_wallet_fund_cont'
import DashboardAppointment from '@/components/dashboard_appointments'
import WalletFundHistory from '@/components/wallet_fund_history'
import AdminAppointmentSchedule from '@/components/physician_appointment_schedule'



const AdminDashboardPage = () => {
    const [fund_search, setFund_search] = useState('')
    return (
        <div className="w-full min-h-[calc(100vh-70px)] bg-gray-100 p-5 hide-scrollbar flex flex-col gap-5">
            <AdminWalletFundCont />


            <div className="w-full bg-white flex flex-col gap-5 p-5 rounded-md shadow-md">
                <p className="text-lg font-medium font-mont">Appointment Schedule</p>

                <AdminAppointmentSchedule fund_search={fund_search} setFund_search={setFund_search} />
            </div>
            <div className="w-full bg-white flex flex-col gap-5 p-5 rounded-md shadow-md">
                <p className="text-lg font-medium font-mont">Patient Consultations</p>

                <AdminAppointmentSchedule fund_search={fund_search} setFund_search={setFund_search} />
            </div>

        </div>
    )
}

export default AdminDashboardPage