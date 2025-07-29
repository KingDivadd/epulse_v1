'use client'
import React, { useState } from 'react'
import WalletFundCont from '@/components/wallet_fund_cont'
import DashboardAppointment from '@/components/dashboard_appointments'
import WalletFundHistory from '@/components/wallet_fund_history'
import WalletFundHistoryTable from '@/components/wallet_fund_history_table'



const DashboardPage = () => {
    const [fund_search, setFund_search] = useState('')
    return (
        <div className="w-full min-h-[calc(100vh-70px)] bg-gray-100 p-5 hide-scrollbar flex flex-col gap-5">
            <WalletFundCont />

            <DashboardAppointment />

            <div className="w-full bg-white flex flex-col gap-5 p-5 rounded-md shadow-md">
                <p className="text-lg font-medium font-mont">Transactions</p>

                <WalletFundHistoryTable fund_search={fund_search} setFund_search={setFund_search} />
            </div>

        </div>
    )
}

export default DashboardPage