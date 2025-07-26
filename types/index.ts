// src/types/next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        accessToken?: string; // Optional since it may not always be present
    }

    interface JWT {
        accessToken?: string; // Optional to match the session
    }
}


declare interface InputProps {
    title: string;
    name: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

declare interface PhoneInputProps {
    phone_number: string; 
    country_code: string; 
    on_change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

declare type UserInfoProps = {
    patient_id?: string;
    physician_id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    gender?: string; 
    country_code?: string;
    date_of_birth?: string;
    phone_number?: string; 
    role?: string;
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    genotype?: string;
    is_verified_by_admin?: boolean;
    avatar?: string;
    
}

declare interface TransactionHistoryProps {
    transaction_id: string | number
    transaction_type: string
    narration: string
    amount: number | string
    date: number | string
}