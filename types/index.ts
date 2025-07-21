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

declare interface UserInfoProps {
    patient_id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string; 
    gender?: string; 
}