'use client'
import DashboardNav from '@/components/dashboard_nav'
import React from 'react'
import WalletFundingPage from '@/page/wallet_funding_page'

const WalletFunding = () => {
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <DashboardNav />

                <WalletFundingPage />
            </div>
        </div>
    )
}

export default WalletFunding