import * as React from "react"

import { Card, CardContent,  } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {doctor_slider_list} from '@/constants'

const DoctorSlider = ()=> {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full ">
            <CarouselContent className="">
                {doctor_slider_list.map((data, ind) => (
                    <CarouselItem key={ind} className="md:basis-1/3 lg:basis-1/4">
                        <div className="p-1">
                            <Card className="bg-[#ffffff] box-shadow-1 border-0 sm:h-[400px] px-3 py-4  gap-3">
                                <p className="text-md font-[500] text-start">{data.title}</p>

                                <span className="relative overflow-hidden h-[225px] sm:h-[175px] w-full bg-amber-500">

                                </span>

                                <div className="w-full flex flex-col items-between  h-[150px] justify-between">
                                    <p className="text-md font-semibold">{data.count}</p>

                                    <p className="text-[13px] sm:text-md text-start text-slate-600 mt-3 font-mont">{data.description}</p>

                                    <button className="mt-2 py-2.5 w-full rounded-full text-white text-[13px] bg-[#306CE9] ">View all specialist</button>
                                </div>


                                
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* <CarouselPrevious className="max-sm:hidden top-[-50px] right-[-20rem]" /> */}
            {/* <CarouselNext className="hidden sm:block top-[-50px] right-0" /> */}
        </Carousel>
    )
}

export default DoctorSlider