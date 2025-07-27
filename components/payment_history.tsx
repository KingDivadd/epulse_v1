import React from 'react'
import DashboardFundHistoryTable from './dashboard_fund_history_table'

const PaymentHistory = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <h3 className="font-mont font-semibold text-lg text-slate-700">Recent Payments</h3>


            <div className="w-full min-h-[300px]">
                <DashboardFundHistoryTable fund_search='' />
            </div>

        </div>
    )
}

export default PaymentHistory