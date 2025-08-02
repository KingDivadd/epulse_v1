'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import { Dot, Loader2Icon } from 'lucide-react'
import {  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { toast_msg } from '@/lib/toast'
import { useChat } from '@/app/context/ChatContext'

const WalletFundCont = () => {
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    const {user_information} = useChat()
    

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
        <div className="w-full max-md:flex-col flex items-start justify-between gap-5  min-h-[250px] font-mont">
            <span className="flex-1 max-md:w-full min-h-[250px] bg-[#306ce9] shadow-md relative rounded-lg ">
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
                            <DialogTitle className='text-xl font-mont font-semibold'>Overview</DialogTitle>
                            <DialogDescription>
                            </DialogDescription>
                        </DialogHeader>
                            
                        <div className="w-full min-h-[150px] flex flex-col justify-between gap-2 px-5 py-3.5 rounded-lg border border-[#E6E6E6] bg-[#f2f2f2]">
                            <span className="flex flex-col gap-1">
                                <span className="text-sm font-mont flex items-center justfy-start font-medium">
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
                                <span className="text-sm font-mont flex items-center justfy-start font-semibold">
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

                <div className="absolute top-0 left-0 w-full h-[250px] flex flex-col items-center justify-center gap-2">
                    <span className="flex items-center ">
                        <p className="text-white text-lg font-mont">Wallet Balance</p>
                    </span>

                    <span className="flex items-center gap-3 mb-5">
                        <span className="h-10 w-10 relative overflow-hidden">
                            <Image src={'/icons/naira-icon.png'} alt='' fill objectFit='contain' />
                        </span>
                        <p className="text-4xl font-bold text-white">10,000</p>
                    </span>

                    <Dialog >
                        <DialogTrigger>
                            <span className="rounded-full bg-white text-sm py-3 px-7 cursor-pointer hover:bg-[#f2f2f2]">Fund Wallet</span>
                        </DialogTrigger>
                        <DialogContent className='w-xl'>
                            <DialogHeader>
                                <DialogTitle className='text-xl font-mont font-semibold'>{(user_information && user_information.role == 'patient') ?  "Fund your wallet" : "Withdraw from your wallet"}</DialogTitle>
                                <DialogDescription className='font-mont text-[13px ' >
                                    {(user_information && user_information.role == 'patient') ?  "Please, enter the amount you would like to fund your wallet with." : "Please, enter the amount you would like to withdraw from your wallet"}
                                    
                                </DialogDescription>
                            </DialogHeader>
                                
                            <form onSubmit={handle_submit} className="w-full md:mt-5 min-h-[150px] flex flex-col justify-between gap-20  rounded-lg border border-[#E6E6E6] bg-[#fafafa] p-5 ">
                                <input type="number" placeholder="amount" name="amount" onChange={(e)=> setAmount(Number(e.target.value))} className="input-type-2" />

                                <button type='submit' className="w-full sm:h-[50px] h-[45px] rounded-sm bg-[#306ce9] hover:bg-[#306ce9]/90 text-white text-sm font-mont" onClick={handle_submit}>
                                    {loading ? <Loader2Icon className="animate-spin size-8 " /> : `${(user_information && user_information.role == 'patient') ?  "Fund wallet" : "Withdraw"}`}
                                </button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    
                </div>

            </span>

            <span className="hidden md-[250px] lg:w-[300px] xl:w-[350px] h-full rounded-lg border border-[#E6E6E6] bg-white shadow-md  md:flex flex-col gap-7 p-5">
                <p className="text-lg font-semibold">Overview</p>

                <div className="w-full min-h-[150px] flex flex-col justify-between gap-2 px-5 py-3.5 rounded-lg border border-[#E6E6E6] bg-[#f2f2f2]">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-mont flex items-center justfy-start">
                            <Dot size={'18px'} className='text-[#306ce9]' /> Total Amount Credited
                        </p>

                        <span className="flex items-center gap-1">
                            <span className="h-5 w-5 relative overflow-hidden">
                                <Image src={'/icons/naira-icon-black.png'} alt='' fill objectFit='contain' />
                            </span>
                            <p className="text-xl font-semibold ">15,000</p>
                        </span>
                    </span>

                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-mont flex items-center justfy-start">
                            <Dot size={'18px'} className='text-red-500' /> Total Amount Debited
                        </p>

                        <span className="flex items-center gap-1">
                            <span className="h-5 w-5 relative overflow-hidden">
                                <Image src={'/icons/naira-icon-black.png'} alt='' fill objectFit='contain' />
                            </span>
                            <p className="text-xl font-semibold ">1,500</p>
                        </span>
                    </span>
                </div>
            </span>
        </div>
    )
}

export default WalletFundCont


