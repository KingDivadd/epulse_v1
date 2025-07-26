import React from 'react'
import WalletFundCont from '@/components/wallet_fund_cont'
import WalletFundHistory from '@/components/wallet_fund_history'

const WalletFundingPage = () => {
    return (
        <div className='p-5  lg:p-8 xl:p-10 w-full flex flex-col gap-5 lg:gap-8 xl:gap-10 bg-[#f2f2f2] font-mont' >

            <div className="w-full">  <WalletFundCont /></div>
            <div className="w-full">  <WalletFundHistory /></div>
            
        </div>
    )
}

export default WalletFundingPage