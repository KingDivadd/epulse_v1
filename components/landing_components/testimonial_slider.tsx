import * as React from "react"

import { Card,   } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {doctor_slider_list} from '@/constants'



const TestimonialSlider = ()=> {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full ">
            <CarouselContent className="">
                {doctor_slider_list.map((data, ind) => (
                    <CarouselItem key={ind} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className="bg-[#ffffff] box-shadow-1 border-0  p-3  gap-3 flex-row items-start justify-between">
                                {/* <p className="text-md font-[500] text-start">{data.title}</p> */}

                                <span className="relative overflow-hidden h-[100px] w-[150px] bg-amber-500 rounded-[10px]">

                                </span>

                                <div className="w-full flex flex-col items-start  h-[100px] justify-between">
                                    <p className="text-[15px] sm:text-md text-start text-slate-600 mt-3 font-mont">{data.description}</p>

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

export default TestimonialSlider