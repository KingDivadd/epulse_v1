'use client'
import React,{useState,useEffect} from 'react'
import  {SearchIcon} from 'lucide-react'
import WalletFundHistoryTable from './wallet_fund_history_table'
import { LoadingProps } from '@/types'

const WalletFundHistory = ({loading, setLoading}:LoadingProps) => {
    const [fund_search, setFund_search] = useState('')


    return (
        <div className="w-full flex flex-col gap-7 sm:gap-5  bg-white shadow-md p-3 sm:p-4 rounded-md">

            <div className="w-full flex flex-wrap gap-3 items-center justify-between">
                <p className="text-[15.5px] font-medium font-mont">Transactions</p>
                
                <span className="h-[40px] max-sm:w-full rounded-full bg-white flex items-center justfy-start relative gap-2 border border-gray-400 px-5 ">
                    <SearchIcon className='text-gray-500 size-5' />
                    <input type="text" name="fund_search" id="" onChange={(e)=> setFund_search(e.target.value)} className="input-type-3 w-full" placeholder='Search History' />
                </span>

            </div>


            <WalletFundHistoryTable fund_search={fund_search} setFund_search={setFund_search} loading={loading} setLoading={setLoading} />

        </div>
    )
}

export default WalletFundHistory