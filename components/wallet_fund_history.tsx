'use client'
import React,{useState,useEffect} from 'react'
import  {SearchIcon} from 'lucide-react'
import WalletFundHistoryTable from './wallet_fund_history_table'

const WalletFundHistory = () => {
    const [fund_search, setFund_search] = useState('')


    return (
        <div className="w-full flex flex-col gap-5">

            <div className="w-full flex items-center justify-between">
                <span className="h-[40px] max-sm:w-full rounded-full bg-white flex items-center justfy-start relative gap-2 border border-gray-400 px-5 ">
                    <SearchIcon className='text-gray-500' />
                    <input type="text" name="fund_search" id="" onChange={(e)=> setFund_search(e.target.value)} className="input-type-3 w-full" placeholder='Search History' />
                </span>

            </div>

            <p className="text-lg font-medium sm:hidden ">Transactions</p>

            <WalletFundHistoryTable fund_search={fund_search} setFund_search={setFund_search} />

        </div>
    )
}

export default WalletFundHistory