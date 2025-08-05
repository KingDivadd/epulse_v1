'use client'
import React, { useState, useEffect } from 'react'
import { transaction_history } from '@/constants'
import { format_date_from_unix } from '@/lib/date_formater'
import { Dot, Loader2 } from 'lucide-react'
import { useChat } from '@/app/context/ChatContext'
import { TransactionType } from '@/types'

interface FundSearchProps {
    fund_search: string
    setFund_search?: (fund_search: string) => void
    loading:boolean;
    setLoading:(loading:boolean)=>void;
}

const WalletFundHistoryTable = ({ fund_search, setFund_search, loading, setLoading }: FundSearchProps) => {
    const {wallet_information, setWallet_information} = useChat()
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredTransactions, setFilteredTransactions] = useState<TransactionType[]>([])

  // Filter transactions based on search input
    useEffect(() => {

        if (wallet_information?.transactions) {

            const newList = wallet_information?.transactions.filter((item: TransactionType) => {
                const formattedDateTime = `${format_date_from_unix(Number(item.created_at)).date} ${format_date_from_unix(Number(item.created_at)).time}`
                return (
                    item.narration.toLowerCase().includes(fund_search.toLowerCase()) ||
                    item.amount.toString().includes(fund_search) ||
                    item.transaction_type.toLowerCase().includes(fund_search.toLowerCase()) ||
                    formattedDateTime.toLowerCase().includes(fund_search.toLowerCase())
                )
            })
    
            setFilteredTransactions(newList)
            setCurrentPage(1) // Reset to first page on filter change
        }

    }, [fund_search, wallet_information?.transactions])


    async function app_projects_action(item: string) {
        
        let new_page_number = wallet_information?.page_number;
        const max_page_number = wallet_information?.total_number_of_pages

        if (item === 'prev') {
            if (wallet_information?.page_number! > 1) {
                new_page_number = wallet_information?.page_number! - 1;          
            }
        } else if (item === 'next') {
            if (max_page_number && wallet_information?.page_number! < max_page_number) {
                new_page_number = wallet_information?.page_number! + 1;
            }
        } else {
        new_page_number = item;
        }

        setLoading(true)

        // handle_fetch_projects(list_number, new_page_number)
        setWallet_information({...wallet_information, page_number:new_page_number});
        
    }

    const render_page_numbers = () => {
        const pages = [];
        const max_page_number = wallet_information?.total_number_of_pages ?? 1;
        const max_displayed_pages = 3;

        const page_number = wallet_information?.page_number ?? 1

        if (max_page_number <= max_displayed_pages) {
            for (let i = 1; i <= max_page_number; i++) {
                pages.push(
                <p key={i} className={`text-md font-light h-[27px] w-[27.5px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                    page_number === i ? 'bg-gray-200 text-gray-600' : ''
                    }`}
                    onClick={() => app_projects_action(i)}
                >
                    {i}
                </p>
                );
            }
        } else {
            let startPage = Math.max(1, page_number - 1);
            let endPage = Math.min(page_number + 1, max_page_number);

            if (page_number === 1) {
                startPage = 1;
                endPage = max_displayed_pages;
            } else if (page_number === max_page_number) {
                startPage = max_page_number - 2;
                endPage = max_page_number;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                <p
                    key={i}
                    className={`text-sm font-light h-[27px] w-[27.5px] rounded-[3px] flex items-center justify-center cursor-pointer ${
                    page_number === i ? 'bg-blue-700 text-white' : ''
                    }`}
                    onClick={() => app_projects_action(i)}
                >
                    {i}
                </p>
                );
            }
        }

        return pages;
    }; 

    

  // Calculate pagination
    const totalPages = Math.ceil(wallet_information?.total_number_of_transactions/ wallet_information?.items_per_page )
    const startIndex = (currentPage - 1) * wallet_information?.items_per_page
    const endIndex = startIndex + wallet_information?.items_per_page
    const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

    // Handle navigation
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            if (wallet_information) {
                setWallet_information({...wallet_information, page_number: currentPage + 1})
            }
        }
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            if (wallet_information) {
                setWallet_information({...wallet_information, page_number: currentPage - 1})
            }
        }
    }

    return (
        <div className="w-full max-sm:-mt-2 bg-white  pb-0  overflow-x-auto scrollbar-hidden font-mont">
        {/* Desktop View */}
            <div className={`hidden min-w-[1000px] md:flex flex-col items-start justify-start`}>
                <div className="w-full flex items-center justify-between border h-[55px] border-gray-200  ">
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
                <div className="w-full bg-white relative">
                    {currentTransactions.length ? 
                        <div className="w-full min-h-[250px] ">
                            {currentTransactions.map((data: TransactionType, ind: number) => {
    
                                const { transaction_id, transaction_type, narration, amount, created_at } = data
    
                                const transaction_type_style = `px-5 h-[30px] rounded-full flex items-center justify-center border ${transaction_type === 'debit' ? 'border-red-500 text-red-500 bg-red-300/5'  : 'border-green-500 text-green-500 bg-green-300/5' }`
    
                                const formatted_date = format_date_from_unix(Number(created_at))
                                return (
                                <div  key={transaction_id}  className={`w-full flex items-center justify-between py-3 ${  ind % 2 === 1 ? 'bg-gray-100' : ''  }`} >
    
                                    <div className="w-[30%] px-3 sm:px-5 flex items-center justify-start">
                                        <p className="text-sm">
                                            {formatted_date.date}, {formatted_date.time}
                                        </p>
                                    </div>
                                    <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                                        <button className={transaction_type_style}>
                                            {/* <Dot size="30px" /> */}
                                            <p className="text-sm">{transaction_type}</p>
                                        </button>
                                    </div>
                                    <div className="w-[30%] px-3 sm:px-5 flex items-center justify-start overflow-hidden">
                                        <p className="text-sm truncate">{narration}</p>
                                    </div>
                                    <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                                        <p className="text-sm flex items-center">₦ {amount.toFixed(2)}</p>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                        
                        :
                        <div className="w-full h-[250px] flex items-center justify-center">
                            <p className="text-sm font-medium">No Transactions yet</p>
                        </div>
                    }

                    {loading && <div className="absolute top-0 left-0 h-[250px] w-full flex items-center justify-center ">
                        <Loader2 className="h-10 w-10 animate-spin text-gray-300" />
                    </div>}
                    
                </div>

                {/* Pagination Controls */}
                <div className="w-full flex items-center justify-between px-5 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className={`text-sm cursor-pointer ${wallet_information?.page_number == 1 ? "text-gray-400 cursor-not-allowed":'text-gray-700 cursor-pointer'}`} onClick={() => app_projects_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className={`text-sm ${wallet_information?.page_number == wallet_information?.total_number_of_pages ? "text-gray-400 cursor-not-allowed ":'text-gray-700 cursor-pointer'}`} onClick={() => app_projects_action('next')}>Next</p>
                        </span>
                        
                    </div>

                    <p className="text-sm">
                        Page {wallet_information?.page_number} of {wallet_information?.total_number_of_pages}
                    </p>
                </div>
            </div>

            {/* Mobile View */}
            <div className="w-full flex flex-col md:hidden">
                {currentTransactions.map((data: TransactionType, ind: number) => {
                const { transaction_id, transaction_type, narration, amount, created_at } = data
                const formatted_date = format_date_from_unix(Number(created_at))
                const transaction_type_style = `text-[14px] flex items-center ${
                    transaction_type === 'debit' ? 'text-red-500' : 'text-green-500'
                }`

                return (
                    <div key={transaction_id} className="w-full flex flex-col gap-2 font-mont py-4   last:pb-4 border-b border-[#f2f2f2] first:border-[#e2e2e2] first:border-t">
                        <span className="w-full flex items-start justify-between">
                            <p className="text-[14px] w-[70%] text-gray-700 ">{narration}</p>
                            <span className="text-[14px] flex items-center">
                            ₦<p className="">{amount.toFixed(2)}</p>
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

                <div className="w-full flex items-center justify-between px-5 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="flex flex-row items-center justify-start gap-3 h-full">
                            <p className={`text-sm cursor-pointer ${wallet_information?.page_number == 1 ? "text-gray-400 cursor-not-allowed":'text-gray-700 cursor-pointer'}`} onClick={() => app_projects_action('prev')}>Prev</p>
                            <span className="w-auto h-full flex flex-row items-center justify-start">
                            {render_page_numbers()}
                            </span>
                            <p className={`text-sm ${wallet_information?.page_number == wallet_information?.total_number_of_pages ? "text-gray-400 cursor-not-allowed ":'text-gray-700 cursor-pointer'}`} onClick={() => app_projects_action('next')}>Next</p>
                        </span>
                        
                    </div>

                    <p className="text-sm">
                        Page {wallet_information?.page_number} of {wallet_information?.total_number_of_pages}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WalletFundHistoryTable