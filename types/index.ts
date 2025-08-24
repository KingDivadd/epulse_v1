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
    bio: string;
    country: string;
    registered_as: string;
    specialty: string;
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
    date_of_birth?: number;
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
    specialty?: string;
    bio?: string;
    languages_spoken?: string[];
    current_hospital_or_clinic?: string;
    blood_group?:string;
    weight?:number;
    height?:number;
    medical_license?: string;
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

export type PhysicianType = {
    address:string;
    apple_apn:string;
    avatar:string;
    bio:string;
    cac_document:string;
    country:string
    country_code:string
    created_at:number
    date_of_birth:number;
    date_of_establishment:number
    email:string;
    first_name:string;
    gender:string;
    is_verified:boolean;
    is_verified_by_admin:boolean;
    languages_spoken:string[]
    last_name:string;
    medical_license:string;
    other_names:string;
    password:string;
    phone_number:string;    
    physician_id:string;
    professional_credentials:string;
    registered_as:string;
    signature:string;
    specialty:string;
    state:string; 
    verification_of_employment:string
}

export interface PhysicianInformationProps {
    total_number_of_pages:number;
    total_number_of_physicians:number;
    physicians: PhysicianType[];
}

export type AppointmentType = {
    appointment_id: string;
    appointment_type: string;
    created_at: number;
    updated_at: number;
    status: string;
    in_session: boolean;
    complain: string;
    patient: UserInfoProps;
    physician: UserInfoProps;
    time: number;
    last_message:string;
    last_message_time:number;
    
}
export interface AppointmentProps {
    pending_appointment: number;
    accepted_appointment: number;
    completed_appointment: number;
    total_number_of_appointments: number; 
    total_number_of_pages: number;
    appointments: AppointmentType[];
}

export interface PatientDashboardProps {
    wallet_balance: number;
    total_amount_credited: number; 
    total_amount_debited: number;
    
    total_number_of_appointments: number;
    total_number_of_pages: number;
    appointments: AppointmentType[],
    
    total_number_of_transactions: number, 
    total_number_of_pages_1: number, 
    transactions: TransactionType[],
}

export type ChatListType = {
    appointment_id: string; 
    createdAt: string;
    date: number;
    idempotency_key: string;
    is_patient: boolean;
    is_physician: boolean;
    media: string[];
    patient_id: string;
    physician_id: string;
    text: string;
    updatedAt: string;
    token?: string;
}

type ChatType = {
    statusCode: number;
    data:  ChatListType;
}

export type ChatResponseType = {
    statusCode: number;
    chat: ChatType;
    idempotency_key: number;
    message: string;
}

export type ReceiverChatResponseType = {
    chat: ChatType;
    idempotency_key: string;
    note: string;
    statusCode: number;
    senderData: UserInfoProps
}

export type TriggerActionRefresh = {
    trigger_doctors_refresh: boolean;
    trigger_transaction_refresh: boolean;
    trigger_appointment_refresh: boolean;
}

type NotificationData = {
    appointment_id?: string;
    case_note_id?: string;
    created_at: string;
    is_read: boolean;
    notification_for_patient: boolean;
    notification_for_physician: boolean;
    notification_id: string
    notification_sub_type: string;
    notification_type: string;
    patient_id: string | null;
    physician_id: string | null;
    status: string;
    transaction_id: string | null;
    updated_at: string; 
}

export type SocketType ={
    statusCode: number;
    is_read: boolean;
    notificationData: NotificationData;
}