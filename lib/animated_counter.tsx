'use client'
import React from 'react'
import CountUp from 'react-countup'

const Animated_counter = ({amount}: {amount:number}) => {
    return (
        <div className='w-full'>
            <CountUp
                decimals={2}
                decimal='.'
                prefix='₦ '
                end={amount} 
                duration={1}
                className=' gap-2'
            />
        </div>
    )
}

export default Animated_counter