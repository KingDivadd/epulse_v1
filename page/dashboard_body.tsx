import React from 'react'
import Consultation from '@/components/consultation'
import PaymentHistory from '@/components/payment_history'   
import ActivityHistory from '../components/activity_history'

const DashboardBody = () => {
    return (
        <div className="p-5 lg:p-8 xl:p-10 lg:gap-8 xl:gap-10 gap-5 w-full flex items-start justify-between bg-[#f2f2f2]">
            <section className="flex-1 flex flex-col items-start justify-start gap-10">
                <Consultation />

                <PaymentHistory />
            </section>

            <section className="w-[255px]  max-md:absolute right-[-260px] lg:w-[300px] xl:w-[350px] flex items-start justify-start ">
                <ActivityHistory />
            </section>
        </div>
    )
}

export default DashboardBody