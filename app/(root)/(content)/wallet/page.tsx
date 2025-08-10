'use client'
import Navbar from '@/components/navbar'
import React from 'react'
import WalletFundingPage from '@/page/wallet_funding_page'
import { useChat } from '@/app/context/ChatContext'
import Loader from '@/page/loader'


const WalletFunding = () => {
    const {user_information} = useChat()


    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <Navbar />

                
                <div className="w-full">
                    {
                        user_information ? 
                        <WalletFundingPage />
                        :
                        <Loader />
                    }
                </div>
            </div>
        </div>
    )
}

export default WalletFunding