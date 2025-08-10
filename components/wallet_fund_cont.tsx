'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import { Dot, Loader2Icon } from 'lucide-react'
import {  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { toast_msg } from '@/lib/toast'
import { useChat } from '@/app/context/ChatContext'
import Animated_counter from '@/lib/animated_counter'
import { useRouter } from 'next/navigation'

const WalletFundCont = () => {
    const {setRoute} = useChat()
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    const {user_information, wallet_information, setWallet_information} = useChat()
    const router = useRouter()
    

    async function handle_submit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        if (amount < 100){
            toast_msg({title: 'Amount cannot be less than ₦100'})
            setLoading(false)
            return;
        }

        if (user_information && user_information.role == 'patient') {
            
            try {
                toast_msg({title: 'Funds transafer in progress'})
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
            return
        }else{
            try {
                toast_msg({title: 'Funds withdrawal in progress'})
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
            return

        }

        
    }
    return (
        <div className="w-full max-md:flex-col flex items-start justify-between gap-5  min-h-[240px] font-mont">
            <span className="flex-1 max-md:w-full min-h-[240px] bg-[#306ce9] shadow-md relative rounded-lg ">
                <span className="w-full h-200px">
                    <Image src={'/wallet-img-1.jpg'} alt='wallet img ' fill objectFit='cover' className='rounded-md' />
                </span>

                <Dialog >
                    <DialogTrigger>
                        <div className="absolute right-5 top-5 h-5 w-5 cursor-pointer z-2 md:hidden">
                            <Image src={'/icons/information-icon.png'} alt='' fill objectFit='contain' />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='text-[15.5px] font-mont font-semibold'>Overview</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                            
                        <div className="w-full min-h-[150px] flex flex-col justify-between gap-2 px-5 py-3.5 rounded-lg border border-[#E6E6E6] bg-[#f2f2f2]">
                            <span className="flex flex-col gap-1">
                                <span className="text-[13px] font-mont flex items-center justfy-start font-medium">
                                    <Dot size={'18px'} className='text-[#306ce9]' /> Total Amount Credited
                                </span>

                                <span className="flex items-center gap-1">
                                    <span className="h-5 w-5 relative overflow-hidden">
                                        <Image src={'/icons/naira-icon-black.png'} alt='' fill objectFit='contain' />
                                    </span>
                                    <span className="text-xl font-bold font-mont">15,000</span>
                                </span>
                            </span>

                            <span className="flex flex-col gap-1">
                                <span className="text-[13px] font-mont flex items-center justfy-start font-semibold">
                                    <Dot size={'18px'} className='text-red-500' /> Total Amount Debited
                                </span>

                                <span className="flex items-center gap-1">
                                    <span className="h-5 w-5 relative overflow-hidden">
                                        <Image src={'/icons/naira-icon-black.png'} alt='' fill objectFit='contain' />
                                    </span>
                                    <span className="text-xl font-bold font-mont">1,500</span>
                                </span>
                            </span>
                        </div>
                    </DialogContent>
                </Dialog>

                <div className="absolute top-0 left-0 w-full h-[240px] flex flex-col items-center justify-center gap-2">
                    <span className="flex items-center ">
                        <p className="text-white text-[15.5px] font-mont">Wallet Balance</p>
                    </span>

                    <span className="flex items-center gap-3 mb-5">
                        {/* <span className="h-8 w-8 relative overflow-hidden">
                            <Image src={'/icons/naira-icon.png'} alt='' fill objectFit='contain' />
                        </span> */}
                        <span className="text-3xl font-bold text-white">{Animated_counter({amount: wallet_information?.wallet_balance ?? 0})}</span>
                    </span>

                    <span className="rounded-full bg-white text-[13px] py-3 px-7 cursor-pointer hover:bg-[#f2f2f2]" onClick={()=> {router.push('/wallet'); setRoute('wallet')}} >{(user_information && user_information.role == 'patient') ? "Fund Wallet" : "Withdraw"}</span>
                        

                    
                </div>

            </span>

            <span className="hidden md-[250px] lg:w-[300px] xl:w-[350px] h-full rounded-lg border border-[#E6E6E6] bg-white shadow-md  md:flex flex-col gap-7 p-4">
                <p className="text-[15.5px] font-semibold">Overview</p>

                <div className="w-full min-h-[155px] flex flex-col justify-between gap-2 px-5 py-3.5 rounded-lg border border-[#E6E6E6] bg-[#f2f2f2]">
                    <span className="flex flex-col gap-1">
                        <p className="text-[13px] font-mont flex items-center justfy-start">
                            <Dot size={'18px'} className='text-[#306ce9]' /> Total Amount Credited
                        </p>

                            
                        <span className="text-xl font-semibold text-gray-700 ">{Animated_counter({amount: wallet_information?.total_amount_credited ?? 0})}</span>
                    </span>

                    <span className="flex flex-col gap-1">
                        <p className="text-[13px] font-mont flex items-center justfy-start">
                            <Dot size={'18px'} className='text-red-500' /> Total Amount Debited
                        </p>

                        
                        <span className="text-xl font-semibold text-gray-700 ">{Animated_counter({amount: wallet_information?.total_amount_debited ?? 0})}</span>
                        
                    </span>
                </div>
            </span>
        </div>
    )
}

export default WalletFundCont


