import React from 'react'
import WalletFundCont from '@/components/wallet_fund_cont'
import WalletFundHistory from '@/components/wallet_fund_history'

const WalletFundingPage = () => {
    return (
        <div className='p-5 h-[calc(100vh-70px)] w-full  bg-gray-100 font-mont ' >
            <div className="w-full h-full overflow-y-auto hide-scrollbar gap-5 flex flex-col ">
                <div className="w-full">  <WalletFundCont /></div>
                <div className="w-full">  <WalletFundHistory /></div>

            </div>
        </div>
    )
}

export default WalletFundingPage