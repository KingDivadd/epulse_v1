'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import InputComponent from '@/components/auth_components/input_component'
import { post_request } from '@/app/api/index'
import { toast_msg } from '@/components/toast'
import { DropdownMenu,  DropdownMenuContent,   DropdownMenuLabel,  DropdownMenuRadioGroup, DropdownMenuRadioItem,  DropdownMenuSeparator,  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ChevronDown} from 'lucide-react'

import PhoneInputComponent from '@/components/auth_components/phone_input_component'


const UserDetails = () => {
    const [auth, setAuth] = useState({gender:'', country_code:'', phone_number:'' })
    const [loading, setLoading] = useState(false)
    const [position, setPosition] = React.useState("")

    useEffect(() => {
        setAuth({...auth, gender: position})
    }, [position])

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

        setAuth({...auth, [name]:value})
    }

    async function handle_submit(e:any) {
        e.preventDefault()
    
        setLoading(true)

        try {
            const response = await post_request('auth/patient-signup', auth)
            console.log(response)
            
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('x-id-key', response.data.headers.get('x-id-key')) 

                console.log("Signup successful:", response.data);

                toast_msg({title: "Account created successfully! Please login to continue."})

                setLoading(false)
            } else if (response.status === 500 ){
                toast_msg({title: "Network error. Please try again later."})
            }
            else {
                setLoading(false)

                const error_msg = `${response.response.data.msg || "An error occurred during signup."}`

                toast_msg({title: error_msg})
            }

        } catch (error) {
            console.error("Error during signup:", error);
        } finally {
            setLoading(false)
        }


    }
    return (
        <section className="w-full h-full px-[1rem] md:px-[2rem] lg:px-[4rem] flex flex-col items-center justify-center gap-8 relative overflow-y-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 my-10">
                
                <h5 className="font-bold font-mont text-4xl text-[#306CE9]">EPULSE.</h5>

                <p className="text-xl sm:text-2xl text-slate-700 font-[500] font-mont">Input Details</p>


                <form onSubmit={handle_submit} className="w-full flex flex-col gap-5 justify-center items-start ">

                    <DropdownMenu >
                        <DropdownMenuTrigger asChild className='w-full'>
                            <Button className='w-full h-[50px] border-slate-400 bg-white text-[15px] font-mont justify-between outline-0 hover:bg-white focus:bg-white' variant="outline">
                                {position || 'Select'}
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[300px] border-slate-700 box-shadow-1">
                            <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className='w-full '>
                                <DropdownMenuRadioItem className='w-full h-[50px] text-md font-mont hover:bg-slate-200 ' value="Male">Male</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem className='w-full h-[50px] text-md font-mont hover:bg-slate-200 ' value="Female">Female</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem className='w-full h-[50px] text-md font-mont hover:bg-slate-200 ' value="Confused">Confused</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <PhoneInputComponent />
                    
                    <Button size="sm" className="mt-5 w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-semibold rounded-md text-md"  disabled={auth.phone_number === '' || auth.gender === '' || auth.country_code === ''  }>
                        {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Next'}
                    </Button>
                </form>


                <h3 className="text-md flex items-center justify-center gap-1 font-semibold mt-[-10px] font-mont text-slate-700">
                    Already have an account? <Link href={'/login'} className='text-[#306CE9] hover:underline duration-300 '>Login</Link>
                </h3>
            </div>

        </section>
    )
}

export default UserDetails