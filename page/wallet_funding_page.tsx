'use client'
import React, { useEffect, useState } from 'react'
import WalletFundCont from '@/components/wallet_fund_cont'
import WalletFundHistory from '@/components/wallet_fund_history'
import { useChat } from '@/app/context/ChatContext'
import { toast_msg } from '@/lib/toast'
import { get_auth_request } from '@/app/api'
import { AxiosResponseHeaders } from 'axios'
import { useRouter } from 'next/navigation'


const WalletFundingPage = () => {
    const router=useRouter()
    const {wallet_information, setWallet_information} = useChat()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!navigator.onLine) {
            toast_msg({title:'Please connect to the internet',type:'danger'})
            return;
        }
        handle_fetch_wallet_information()
    }, [wallet_information?.page_number, wallet_information?.items_per_page])


    async function handle_fetch_wallet_information() {
        try {

            const res = await get_auth_request(`auth/user-wallet-information/${wallet_information?.page_number ?? 1}/${wallet_information?.items_per_page ?? 10}`) as AxiosResponseHeaders

            if (res.status == 200 || res.status == 201){

                setWallet_information({...wallet_information, ...res.data.data})

                setLoading(false)

            }else if(res.status == 401){

                toast_msg({title:'Session expired, kindly login again',})

                router.push('/login')

            }else{
                toast_msg({title: res.response.data.msg})
            }
            
        } catch (error) {
            console.log('error fetching wallet information : ',error)            
        }
    }



    return (
        <div className='p-5 h-[calc(100vh-70px)] w-full  bg-gray-100 font-mont ' >
            <div className="w-full h-full overflow-y-auto hide-scrollbar gap-5 flex flex-col ">
                <div className="w-full">  <WalletFundCont /></div>
                <div className="w-full">  <WalletFundHistory loading={loading} setLoading={setLoading} /></div>

            </div>
        </div>
    )
}

export default WalletFundingPage