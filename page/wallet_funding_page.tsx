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
    const {wallet_information, setWallet_information, user_information, page_number, setPage_number, items_per_page, setItems_per_page} = useChat()
    const [loading, setLoading] = useState(false)
    const [retry, setRetry] = useState(0)

    useEffect(() => {
        if (!navigator.onLine) {
            toast_msg({title:'Please connect to the internet',type:'danger'})
            return;
        }

        setLoading(true)
        handle_fetch_wallet_information()
    }, [page_number, items_per_page, user_information?.first_name])


    async function handle_fetch_wallet_information() {
        try {

            const res = await get_auth_request(`auth/user-wallet-information/${page_number }/${items_per_page}`) as AxiosResponseHeaders

            if (res.status == 200 || res.status == 201){

                setWallet_information({...wallet_information, ...res.data.data})

                setLoading(false)

            }else if(res.status == 401){

                toast_msg({title:'Session expired, kindly login again!',})

                router.push('/login')

            }else{
                toast_msg({title: res.response.data.msg})

                if (retry < 5) {
                    handle_fetch_wallet_information()
                    setRetry(retry + 1)
                    console.log('retry : ',retry)
                }else{

                    setRetry(0);
                    console.log('clearing retry ',retry)
                    setTimeout(() => {
                        handle_fetch_wallet_information()
                        console.log(' retrying after timeout ',retry)
                    }, 10000);
                }
                


            }
            
        } catch (error) {
            console.log('error fetching wallet information : ',error)            
        }
    }



    return (
        <div className='p-5 min-h-[calc(100vh-70px)] w-full  bg-gray-50 font-mont ' >
            <div className="w-full h-full overflow-y-auto hide-scrollbar gap-5 flex flex-col ">
                <div className="w-full">  <WalletFundCont /></div>
                <div className="w-full">  <WalletFundHistory loading={loading} setLoading={setLoading} /></div>

            </div>
        </div>
    )
}

export default WalletFundingPage