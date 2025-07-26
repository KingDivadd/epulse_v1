'use client'
import React, { useState } from 'react'
import { transaction_history } from '@/constants'
import { format_date_from_unix } from '@/lib/date_formater'
import { Dot } from 'lucide-react'


const ITEMS_PER_PAGE = 5

const WalletFundHistoryTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(transaction_history.length / ITEMS_PER_PAGE)

    // Calculate the slice of transactions to display
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentTransactions = transaction_history.slice(startIndex, endIndex)

  // Handle navigation
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div className="w-full max-sm:-mt-2 bg-white py-5 pb-0 shadow-md rounded-md overflow-x-auto hide-scrollbar">
        {/* Header Row */}
            <div className="hidden min-w-[1000px] md:flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between border-b border-gray-200 pb-2">
                    <div className="w-[30%] px-3 sm:px-5 flex items-center justify-start">
                        <p className="text-sm font-medium">Date</p>
                    </div>
                    <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                        <p className="text-sm font-medium">Transaction Type</p>
                    </div>
                    <div className="w-[30%] px-3 sm:px-5 flex items-center justify-start">
                        <p className="text-sm font-medium">Narration</p>
                    </div>
                    <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                        <p className="text-sm font-medium">Amount</p>
                    </div>
                </div>

                {/* Transaction Rows */}
                <div className="w-full bg-white">
                    {
                        currentTransactions.map((data: TransactionHistoryProps, ind: number) => {
                            const { transaction_id, transaction_type, narration, amount, date } = data
                            const transaction_type_style = `px-5 h-[35px] rounded-full flex items-center justify-center border ${
                                transaction_type === 'debit'
                                ? 'border-red-500 text-red-500 bg-red-300/5'
                                : 'border-green-500 text-green-500 bg-green-300/5'
                            }`
                            const formated_date = format_date_from_unix(Number(date))
                            return (
                                <div key={transaction_id} className={`w-full flex items-center justify-between py-2.5 ${ind % 2 === 1 ? 'bg-gray-100' : ''}`}>
                                    <div className="w-[30%] px-3 sm:px-5 flex items-center justify-start">
                                        <p className="text-sm">
                                        {formated_date.date}, {formated_date.time}
                                        </p>
                                    </div>
                                    <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                                        <button className={transaction_type_style}>
                                        <Dot size={'30px'} />
                                        <p className="text-sm">{transaction_type}</p>
                                        </button>
                                    </div>
                                    <div className="w-[30%] px-3 sm:px-5 flex items-center justify-start overflow-hidden">
                                        <p className="text-sm truncate">{narration}</p>
                                    </div>
                                    <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                                        <p className="text-sm flex items-center">₦{amount}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* Pagination Controls */}
                <div className="w-full flex items-center justify-between px-5 py-3 border-t border-gray-200">
                    <p className="text-sm">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <button className={`px-5 h-[30px] text-sm rounded-full border border-gray-300 ${
                            currentPage === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button className={`px-5 h-[30px] text-sm rounded-full border border-gray-300 ${
                            currentPage === totalPages
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col md:hidden ">

                {
                    currentTransactions.map((data:TransactionHistoryProps, ind:number)=>{
                        const {transaction_type, narration, amount, date} = data
                        const formated_date = format_date_from_unix(Number(amount))

                        const transaction_type_style = `text-[14px] flex items-center ${transaction_type === 'debit'?'text-red-500':'text-green-500'}`

                        return(
                            <div key={ind} className="w-full flex flex-col gap-2 font-mont p-4 first:pt-0 last:pb-4 border-b border-[#f2f2f2]">
                                <span className="w-full flex items-start justify-between">
                                    <p className="text-[14px] w-[70%] font-medium truncate">{narration}</p>
                                    <span className="text-[14px] flex items-center">₦<p className='font-medium'>{amount}</p></span>
                                </span>
                                
                                <span className="w-full flex items-start justify-between">
                                    <p className="text-[14px] w-[70%] truncate text-gray-500">{formated_date.date}, {formated_date.time}</p>
                                    <p className={transaction_type_style}>{transaction_type}</p>
                                </span>
                            </div>
                        )
                    })
                }

                <div className="w-full flex items-center justify-between px-5 py-3 border-t border-gray-200">
                    <p className="text-sm">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <button className={`px-5 h-[30px] text-sm rounded-full border border-gray-300 ${
                            currentPage === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button className={`px-5 h-[30px] text-sm rounded-full border border-gray-300 ${
                            currentPage === totalPages
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default WalletFundHistoryTable