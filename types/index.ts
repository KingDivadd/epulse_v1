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

declare interface DoctorProps {
    first_name: string;
    last_name: string;
    description: string;
    country: string;
    registered_as: string;
    speciality: string;
    languages_spoken: string[];
    avatar: string;
    current_hospital_or_clinic: string;
}

export interface UserInfoProps {
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
    registered_as?: string;
    speciality?: string;
    description?: string;
    languages_spoken?: string[];
    current_hospital_or_clinic?: string;
    blood_group?:string;
    genotyp?:string;
    weight?:number;
    height?:number;
}

declare type TransactionHistoryProps = {
    transaction_id: string | number
    transaction_type: string
    narration: string
    amount: number | string
    date: number | string
}

export type TransactionType = {
    transaction_id: string;
    amount: number;
    account_id: string | null;
    patient_id: string | null;
    physician_id: string | null;
    transaction_type: string;
    transaction_sub_type: string | null;
    narration: string;
    created_at: number;
    updated_at: number;
}

export interface WalletInformationProps {
    page_number:number;
    items_per_page:number;
    wallet_balance: number;
    total_amount_credited: number;
    total_amount_debited: number;
    total_number_of_transactions: number;
    total_number_of_pages: number;
    transactions: TransactionType[];
}

export interface LoadingProps {
    loading: boolean;
    setLoading: (loading: boolean) =>void;
}