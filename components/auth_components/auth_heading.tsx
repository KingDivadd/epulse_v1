import React from 'react'

const AuthHeading = ({title}:{title:string}) => {
    return (
        <span className="w-full flex flex-col items-center gap-8 ">
            <h5 className="font-bold font-mich text-3xl bg-gradient-to-t text-[#306ce9] ">EPulse</h5>

            <p className="text-lg sm:text-xl text-slate-700 font-[500] font-mont">{title}</p>
        </span>
    )
}

export default AuthHeading