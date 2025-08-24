'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6';
import { IoCheckmark } from 'react-icons/io5';

interface DropDownWithSearchBarProps {
    selected_item: string;
    setSelected_item: (selected_item: string) => void;
    dropArray: string[];
}

export const DropDownWithSearchBar = ({ dropArray, selected_item, setSelected_item }: DropDownWithSearchBarProps) => {
    const [drop_menu, setDrop_menu] = useState(false);
    const [drop_input, setDrop_input] = useState({ search_input: '' });
    const [dropArrayClone, setDropArrayClone] = useState<string[]>(dropArray);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDrop_menu(false);
            }
            };
            document.addEventListener('mousedown', handleOutsideClick);
            return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    // Sync dropArrayClone with dropArray and reset search on mount or dropArray change
    useEffect(() => {
        setDropArrayClone(dropArray);
        setDrop_input({ search_input: '' });
    }, [dropArray]);

    // Toggle dropdown menu
    const handle_drop_menu = () => {
        setDrop_menu(!drop_menu);
    };

    // Select an item and close dropdown
    const handle_select_drop_down = (data: string) => {
        setSelected_item(data);
        setDrop_menu(false);
    };

    // Filter dropdown items based on search input
    const handle_filter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setDrop_input({ search_input: value });
        if (!value) {
            setDropArrayClone(dropArray);
        } else {
        const new_array = dropArray.filter((data) => data.toLowerCase().includes(value));
            setDropArrayClone(new_array);
        }
    };

    return (
        <div className="w-full relative z-[5]" ref={dropdownRef}>
        {/* Dropdown trigger */}
            <span
                className="h-[45px] w-full border border-gray-300 rounded-[4px] px-3 bg-[#306cd9]/80 flex items-center justify-between cursor-pointer"
                onClick={handle_drop_menu} >
                    <p className="text-[13px]">{selected_item || 'Select'}</p>
                {/* <span className="h-[20px] w-[20px] flex items-center justify-center text-slate-700">
                {drop_menu ? <FaCaretUp size="100%" /> : <FaCaretDown size="100%" />}
                </span> */}
            </span>

            {/* Dropdown menu */}
            {drop_menu && (
                <div className="w-full bg-white min-h-[200px] shadow-md absolute top-[50px] left-0 flex flex-col items-start justify-start py-3 rounded-sm gap-5">
                <span className="w-full px-3">
                    <input
                    type="text"
                    placeholder="Search specialties"
                    value={drop_input.search_input}
                    onChange={handle_filter}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </span>

                <div className="w-full flex flex-col items-start gap-[5px] min-h-[100px]">
                    {dropArrayClone.length === 0 ? (
                    <p className="w-full px-3 py-3 text-[13px] text-gray-500 text-center">No specialties found</p>
                    ) : (
                    <>
                        <span className="w-full px-3 py-3 hover:bg-[#f2f2f2] flex items-center justify-between cursor-pointer" onClick={() => handle_select_drop_down('')} >
                            <p className="text-[13px] text-gray-600 font-mont">All Specialties</p>
                            <span className="h-[20px] w-[20px] flex items-center justify-center text-black">
                                {selected_item === '' && <IoCheckmark size="100%" />}
                            </span>
                        </span>
                        {dropArrayClone.map((data) => (
                        <span key={data} className="w-full px-3 py-3 hover:bg-[#f2f2f2] flex items-center justify-between cursor-pointer" onClick={() => handle_select_drop_down(data)} >
                            <p className="text-[13px] font-mont text-gray-600">{data}</p>
                            <span className="h-[20px] w-[20px] flex items-center justify-center text-black">
                            {selected_item === data && <IoCheckmark size="100%" />}
                            </span>
                        </span>
                        ))}
                    </>
                    )}
                </div>
                </div>
            )}
        </div>
    );
};