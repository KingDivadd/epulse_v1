
"use client"; 
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
    title: string;
    name: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const InputComponent = ({ title, type, name, value, onChange }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Determine input type based on showPassword state
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <span className="flex flex-col items-start justify-start gap-2 w-full">
            <p className="text-sm font-medium text-slate-700 font-mont">{title}</p>
            <div className="relative w-full">
                <input
                type={inputType}
                className="input-type-1 w-full pr-10" // Extra padding for icon
                value={value}
                onChange={onChange}
                name={name}
                />
                {type === "password" && (
                <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center justify-center"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                    )}
                </button>
                )}
            </div>
        </span>
    );
};

export const InputComponent3 = ({ title, type, name, value, onChange }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Determine input type based on showPassword state
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <span className="flex flex-col items-start justify-start gap-2 w-full">
            <p className="text-sm font-medium text-slate-700 font-mont">{title}</p>
            <div className="relative w-full">
                <input
                type={inputType}
                className="input-type-2 w-full pr-10" // Extra padding for icon
                value={value}
                onChange={onChange}
                name={name}
                />
                {type === "password" && (
                <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center justify-center"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                    )}
                </button>
                )}
            </div>
        </span>
    );
};

export default InputComponent;

export const InputComponent2 = ({ title, type, name, value, onChange }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Determine input type based on showPassword state
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <span className="flex flex-col items-start justify-start gap-2 w-full">
            <div className="relative w-full">
                <input
                type={'tel'}
                className="input-type-2 w-full pr-10 h-[50px]" // Extra padding for icon
                value={value}
                onChange={onChange}
                name={name}
                />
            </div>
        </span>
    );
};
