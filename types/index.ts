declare interface InputProps {
    title: string;
    name: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

declare interface PhoneInputProps {
    title: string;
    name: string;
    value: string; // Phone number without country code (e.g., "7044907610")
    countryCode: string; // Country code (e.g., "+234")
    onChange: (e: { name: string; value: string; countryCode: string }) => void;
}