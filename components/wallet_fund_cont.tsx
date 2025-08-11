'use client'
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { Dot, Loader2Icon } from 'lucide-react'
import {  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { toast_msg } from '@/lib/toast'
import {handle_encrypt} from '@/lib/funds_encryption'
import { useChat } from '@/app/context/ChatContext'
import Animated_counter from '@/lib/animated_counter'
import { useRouter } from 'next/navigation'
import InputComponent from './auth_components/input_component'
import { Button } from './ui/button'
import { post_auth_request } from '@/app/api'
import { AxiosResponseHeaders } from 'axios'

interface TriggerProps {
    trigger_refresh: boolean;
    setTrigger_refresh: (trigger_refresh:boolean) =>void;
}
const WalletFundCont = ({trigger_refresh, setTrigger_refresh}:TriggerProps) => {
    const {setRoute} = useChat()
    const [funds_data, setFunds_data] = useState({patient_id:'', physician_id: '', amount:0, transaction_type:''})
    const [loading, setLoading] = useState(false)
    const {user_information, wallet_information, setWallet_information} = useChat()
    const router = useRouter()
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {

        if (!user_information || !user_information.role) {
            
            toast_msg({title:'Error occured, kindly login again ', type:'danger'})

            router.push('/login')

            return;
        }
        const {patient_id, physician_id} = user_information

        patient_id && setFunds_data({...funds_data, patient_id, transaction_type:'credit' })

        physician_id && setFunds_data({...funds_data, physician_id, transaction_type: 'debit'})

    }, [trigger])
    

    async function handle_submit(e: React.FormEvent) {
        e.preventDefault()

        setLoading(true)

        if (funds_data.amount < 100){
            toast_msg({title: 'Amount cannot be less than ₦100'})
            setLoading(false)
            return;
        }

        try {

            // get encrypted string

            const new_data = {...funds_data, amount:funds_data.amount * 100}

            console.log(new_data)

            const encrypted_string = await handle_encrypt(JSON.stringify(new_data));

            if (!encrypted_string) return toast_msg({title: 'Error occured while encrypting data', type:'danger'});

            if (encrypted_string?.status == 404) return toast_msg({title: encrypted_string.msg, type: 'danger'});

            const route = user_information?.role == 'patient' ? 'decrypt-deposit-transaction-data' : 'decrypt-withdrawal-transaction-data'

            const res = await post_auth_request(`auth/${route}`, {encrypted_data: encrypted_string.msg}) as AxiosResponseHeaders;

            console.log(res)

            if (res.status == 200 || res.status == 201) {

                setFunds_data({...funds_data, amount:0})

                setLoading(false)

                toast_msg({title: res.data.msg})

                setTrigger_refresh(!trigger_refresh)

            }else{
                toast_msg({title: res.response.data.msg, type:'danger'})
            }
            
        } catch (err) {
            console.log(err)
        }finally{
            setLoading(false)
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

                    <Dialog >
                        <DialogTrigger>
                            <span className="rounded-full bg-white text-[13px] py-3 px-7 cursor-pointer hover:bg-[#f2f2f2]" onClick={()=> setTrigger(!trigger)} >
                                {(user_information && user_information.role == 'patient') ? "Fund Wallet" : "Withdraw"}
                            </span>
                        </DialogTrigger>
                        <DialogContent className='w-full sm:max-w-lg '>
                            <DialogHeader>
                                <DialogTitle className='text-[15.5px] font-mont font-semibold'>{user_information?.role == 'patient' ? "Fund Wallet":"Withdraw"}</DialogTitle>
                                <DialogDescription className='font-mont text-[13px]'>{`Enter the amount you want to ${user_information?.role == 'patient' ? "deposit":"withdraw"}`}
                                </DialogDescription>
                            </DialogHeader>
                                
                            <div className="w-full flex flex-col gap-10 bg-gray-100 border border-gray-200 rounded-md p-3">
                                <span className="w-full flex flex-col gap-5">
                                    <p className="text-[13px] font-medium text-slate-700 font-mont">{"Amount"}</p>

                                    <span className="h-[45px] w-full">
                                        <input type="number" name="amount" id="" onChange={(e)=> setFunds_data({...funds_data, amount: Number(e.target.value)})} value={funds_data.amount} className='input-type text-[13px]' />
                                    </span>
                                </span>

                                <Button className='w-full h-[50px] text-white bg-[#306ce9] hover:bg-[#306ce9]/90 rounded-sm text-[13px] font-mont duration-200' disabled={funds_data.amount < 100 } onClick={handle_submit}>
                                {loading ? <Loader2Icon className='size-7 animate-spin' /> : 'Submit' }
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    

                    
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


