import React, { useEffect } from 'react'
import {InputComponent2} from './input_component'
import countries from '@/constants/countries.json'
import {useChat} from '@/app/context/ChatContext'

interface PhoneInputProps {
    phone_number: string; 
    country_code: string; 
    on_change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const PhoneInputComponent = ({country_code, phone_number, on_change}:PhoneInputProps) => {

    const { setCountry_dial_code} = useChat()
    

    return (
        <div className="flex items-center gap-2 w-full">
            <select
                name="country_code"
                onChange={(e) => 
                    {
                        setCountry_dial_code(e.target.value)
                    }
                } 
                className="border border-slate-400 rounded px-1 h-[50px] w-1/3 text-sm font-mont" >
                <option value="">Select</option>
                {
                    countries.map((country,ind)=>{

                        return(
                            <option key={ind} value={country.dial_code} className='flex gap-5 text-sm font-mont '>
                                {country.dial_code} {country.name}
                            </option>
                        )
                    })
                }

            </select>
            <InputComponent2 onChange={on_change} name='phone_number' value={phone_number} title='Phone number' type='number' />
            
        </div>
    )
}

export default PhoneInputComponent