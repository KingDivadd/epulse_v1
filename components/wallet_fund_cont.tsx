'use client'
import React from 'react'
import Image from 'next/image'
import { Dot } from 'lucide-react'
import {  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"

const WalletFundCont = () => {
    return (
        <div className="w-full max-md:flex-col flex items-start justify-between gap-5 lg:gap-8 xl:gap-10 min-h-[250px]">
            <span className="flex-1 max-md:w-full min-h-[250px] bg-[#306ce9] relative rounded-lg ">
                <span className="w-full h-200px">
                    <Image src={'/wallet-img-1.jpg'} alt='wallet img ' fill objectFit='cover' className='rounded-md' />
                </span>



                <Dialog >
                    <DialogTrigger>
                        <div className="absolute right-5 top-5 h-5 w-5 cursor-pointer z-2 sm:hidden">
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

                    <span className="flex items-center gap-3">
                        <span className="h-10 w-10 relative overflow-hidden">
                            <Image src={'/icons/naira-icon.png'} alt='' fill objectFit='contain' />
                        </span>
                        <p className="text-4xl font-bold text-white">10,000</p>
                    </span>

                    <button className="rounded-full bg-white text-sm py-3 px-7 mt-5 cursor-pointer hover:bg-[#f2f2f2]">Fund Wallet</button>
                </div>

            </span>

            <span className="max-sm:hidden max-md:w-full w-[300px] xl:w-[350px] h-full rounded-lg border border-[#E6E6E6] bg-white  flex flex-col gap-7 p-5">
                <p className="text-xl font-semibold">Overview</p>

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


