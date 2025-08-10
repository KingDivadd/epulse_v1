'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import { Dot, Loader2Icon } from 'lucide-react'
import {  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { toast_msg } from '@/lib/toast'
import Animated_counter, { Item_counter } from '@/lib/animated_counter'
import { title } from 'process'

const AdminWalletFundCont = () => {
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    

    async function handle_submit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        if (amount < 100){
            toast_msg({title: 'Amount cannot be less than ₦100'})
            setLoading(false)
            return;
        }
        
        try {
            toast_msg({title: 'Funds withdrawal in progress'})
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="w-full max-md:flex-col flex items-start justify-between gap-5 font-mont">
            <span className="flex-1 max-md:w-full min-h-[250px] bg-[#306ce9] shadow-md relative rounded-lg ">
                <span className="w-full h-[200px]">
                    <Image src={'/wallet-img-1.jpg'} alt='wallet img ' fill objectFit='cover' className='rounded-md' />
                </span>

                <Dialog >
                    <DialogTrigger>
                        <div className="absolute right-5 top-5 h-5 w-5 cursor-pointer z-2 xl:hidden">
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

                <div className="absolute top-0 left-0 w-full h-[250px] flex  items-center justify-between gap-5 p-4">
                    <div className="flex flex-col gap-2 items-center justify-center h-full flex-1">
                        <span className="flex items-center ">
                            <p className="text-white text-[15.5px] font-mont font-medium">Wallet Balance</p>
                        </span>

                        <span className="flex items-center gap-3 mb-5">
                            
                            <span className="text-3xl font-bold text-white font-mont">{Animated_counter({amount: 10000})}</span>
                        </span>

                        <Dialog>
                            <DialogTrigger>
                                <span className="rounded-full bg-white text-[13px] py-2.5 px-7 cursor-pointer hover:bg-[#f2f2f2]">Withdraw</span>
                            </DialogTrigger>
                            <DialogContent className='w-xl'>
                                <DialogHeader>
                                    <DialogTitle className='text-xl font-mont font-semibold'>Withdraw from your wallet</DialogTitle>
                                    <DialogDescription className='font-mont text-[13px ' >
                                        Please, enter the amount you would like to fund withdraw from your wallet.
                                    </DialogDescription>
                                </DialogHeader>
                                    
                                <form onSubmit={handle_submit} className="w-full md:mt-5 min-h-[150px] flex flex-col justify-between gap-20  rounded-lg border border-[#E6E6E6] bg-[#fafafa] p-5 ">
                                    <input type="number" placeholder="amount" name="amount" onChange={(e)=> setAmount(Number(e.target.value))} className="input-type-2" />

                                    <button type='submit' className="w-full sm:h-[50px] h-[45px] rounded-sm bg-[#306ce9] hover:bg-[#306ce9]/90 text-white text-[13px] font-mont" onClick={handle_submit}>
                                        {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Withdraw'}
                                    </button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className=" hidden  md-[250px] lg:w-[300px] xl:w-[350px] h-full  xl:flex flex-col gap-3 p-4 border-[#E6E6E6] bg-white rounded-md">

                        <p className="text-[15.5px] font-mont font-medium">Overview</p>

                        <div className="w-full min-h-[150px] flex flex-col justify-between gap-2 px-5 py-3.5 rounded-lg border border-[#E6E6E6] bg-[#f2f2f2] font-mont">
                            <span className="flex flex-col gap-1">
                                <p className="text-[13px] font-mont flex items-center justfy-start">
                                    <Dot size={'18px'} className='text-[#306ce9]' /> Total Amount Credited
                                </p>

                                <span className="text-xl font-semibold ">{Animated_counter({amount: 15000})}</span>
                                
                            </span>

                            <span className="flex flex-col gap-1">
                                <p className="text-[13px] font-mont flex items-center justfy-start">
                                    <Dot size={'18px'} className='text-red-500' /> Total Amount Debited
                                </p>

                                <span className="text-xl font-semibold ">{Animated_counter({amount: 5500})}</span>
                            </span>
                        </div>
                    </div>
                    
                </div>

            </span>

            <span className="hidden md:w-[250px] lg:w-[300px] xl:w-[350px] h-[250px] rounded-lg border border-[#E6E6E6] bg-white shadow-md  md:flex flex-col gap-5 p-4">
                <p className="text-[15.5px] font-mont font-medium">Consultation Overview</p>

                <div className="w-full min-h-[175px] flex flex-col justify-between gap-2 px-3 py-3.5 rounded-lg border border-[#E6E6E6] bg-[#f2f2f2] font-mont">
                    <span className="flex flex-col gap-3">
                        <span className="text-[13px] font-mont flex items-center justfy-start">
                            <Dot size={'18px'} className='text-[#306ce9]' />Appointments Taken
                        </span>

                        <span className="text-xl font-semibold ml-10">{Item_counter({amount: 500})}</span>
                    </span>

                    <span className="flex flex-col gap-3">
                        <span className="text-[13px] font-mont flex items-center justfy-start">
                            <Dot size={'20px'} className='text-amber-500' /> Pending Appointment
                        </span>
                        
                        <span className="text-xl font-semibold ml-10">{Item_counter({amount: 10})}</span>
                    </span>
                </div>
            </span>
        </div>
    )
}

export default AdminWalletFundCont


