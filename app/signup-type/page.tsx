'use client'
import React, {useState, useEffect} from 'react'
import {useChat} from '@/app/context/ChatContext'
import {signup_roles} from '@/constants'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import AuthHeading from '@/components/auth_components/auth_heading'

const SignupType = () => {
    const router = useRouter()
    const {setUser_information, user_information} = useChat()

    function handle_selected_role(role:string) {
        setUser_information({...user_information, role})

        router.push('/signup')
    }


    return (
        <section className="px-[1rem] md:px-[2rem] lg:px-[5rem] xl:px-[9rem] py-10 md:py-15 lg:py-25 w-screen min-h-screen flex items-center justify-center">
            <div className="w-full flex flex-col items-center gap-8 sm:gap-10">

                <AuthHeading title={`Register as a Patient or Physician`} />

                <div className="w-full temp-205 ">
                    {
                        signup_roles.map((data: {role: string, img?: string, title:string}) =>{
                            const {role, title} = data
                            return(
                                <div key={role} className="w-full flex flex-col items-start gap-5">
                                    <p className="text-md  font-mont">{title}</p>
                                    <article className="role-selection-card h-[350px]" onClick={()=> handle_selected_role(role)}>
                                        <span className="w-full h-full overflow-hidden relative">
                                            <Image src={data.img!} alt={role} objectFit='contain' fill />
                                        </span>
                                    </article>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default SignupType