'use client'
import React, { useState, useEffect } from 'react'
import { transaction_history } from '@/constants'
import { format_date_from_unix } from '@/lib/date_formater'
import { Dot } from 'lucide-react'

interface TransactionHistoryProps {
    transaction_id: string
    transaction_type: string
    narration: string
    amount: number
    date: number
}

const ITEMS_PER_PAGE = 5

interface FundSearchProps {
    fund_search: string
    setFund_search?: (fund_search: string) => void
}

const DashboardFundHistoryTable = ({ fund_search, setFund_search }: FundSearchProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredTransactions, setFilteredTransactions] = useState<TransactionHistoryProps[]>([])

  // Filter transactions based on search input
    useEffect(() => {

        const newList = transaction_history.filter((item: TransactionHistoryProps) => {
            const formattedDateTime = `${format_date_from_unix(item.date).date} ${format_date_from_unix(item.date).time}`
            return (
                item.narration.toLowerCase().includes(fund_search.toLowerCase()) ||
                item.amount.toString().includes(fund_search) ||
                item.transaction_type.toLowerCase().includes(fund_search.toLowerCase()) ||
                formattedDateTime.toLowerCase().includes(fund_search.toLowerCase())
            )
        })

        setFilteredTransactions(newList)
        setCurrentPage(1) // Reset to first page on filter change
    }, [fund_search])

  // Calculate pagination
    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

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
        <div className="w-full max-sm:-mt-2 bg-white py-5 pb-0 shadow-md rounded-md overflow-x-auto scrollbar-hidden font-mont">
        {/* Desktop View */}
            <div className={`hidden min-w-[400px] xl:flex flex-col items-start justify-start`}>
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
                {currentTransactions.map((data: TransactionHistoryProps, ind: number) => {
                    const { transaction_id, transaction_type, narration, amount, date } = data
                    const transaction_type_style = `px-5 h-[35px] rounded-full flex items-center justify-center border ${
                    transaction_type === 'debit'
                        ? 'border-red-500 text-red-500 bg-red-300/5'
                        : 'border-green-500 text-green-500 bg-green-300/5'
                    }`
                    const formatted_date = format_date_from_unix(date)
                    return (
                    <div
                        key={transaction_id}
                        className={`w-full flex items-center justify-between py-2.5 hover:bg-gray-100 ${
                        ind % 2 === 1 ? 'bg-gray-100' : ''
                        }`}
                    >
                        <div className="w-[30%] px-3 sm:px-5 flex items-center justify-start">
                        <p className="text-sm">
                            {formatted_date.date}, {formatted_date.time}
                        </p>
                        </div>
                        <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                        <button className={transaction_type_style}>
                            <Dot size="30px" />
                            <p className="text-sm">{transaction_type}</p>
                        </button>
                        </div>
                        <div className="w-[30%] px-3 sm:px-5 flex items-center justify-start overflow-hidden">
                        <p className="text-sm truncate">{narration}</p>
                        </div>
                        <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                        <p className="text-sm flex items-center">₦{amount.toFixed(2)}</p>
                        </div>
                    </div>
                    )
                })}
                </div>

                {/* Pagination Controls */}
                <div className="w-full flex items-center justify-between px-5 py-3 border-t border-gray-200">
                <p className="text-sm">
                    Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                    <button
                    className={`px-5 h-[30px] text-sm rounded-full border border-gray-300 ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    >
                    Previous
                    </button>
                    <button
                    className={`px-5 h-[30px] text-sm rounded-full border border-gray-300 ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    >
                    Next
                    </button>
                </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="w-full flex flex-col xl:hidden">
                {currentTransactions.map((data: TransactionHistoryProps, ind: number) => {
                const { transaction_id, transaction_type, narration, amount, date } = data
                const formatted_date = format_date_from_unix(date)
                const transaction_type_style = `text-[14px] flex items-center ${
                    transaction_type === 'debit' ? 'text-red-500' : 'text-green-500'
                }`

                return (
                    <div
                    key={transaction_id}
                    className="w-full flex flex-col gap-2 font-mont p-4 first:pt-0 last:pb-4 border-b border-[#f2f2f2]"
                    >
                    <span className="w-full flex items-start justify-between">
                        <p className="text-[14px] w-[70%] font-medium">{narration}</p>
                        <span className="text-[14px] flex items-center">
                        ₦<p className="font-medium">{amount.toFixed(2)}</p>
                        </span>
                    </span>
                    <span className="w-full flex items-start justify-between">
                        <p className="text-[14px] w-[70%] truncate text-gray-500">
                        {formatted_date.date}, {formatted_date.time}
                        </p>
                        <p className={transaction_type_style}>{transaction_type}</p>
                    </span>
                    </div>
                )
                })}

                <div className="w-full flex items-center justify-between px-5 py-3 border-t border-gray-200">
                <p className="text-sm">
                    Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                    <button
                    className={`px-5 h-[30px] text-sm rounded-full border border-gray-300 ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    >
                    Previous
                    </button>
                    <button
                    className={`px-5 h-[30px] text-sm rounded-full border border-gray-300 ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
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

export default DashboardFundHistoryTable