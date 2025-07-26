import { Home, CalendarClock, FileHeart, WalletCards, CreditCard, Settings, LogOut, Languages } from 'lucide-react';

// landing Page Navbar contents
export const landing_navbar_data = [
    {title: 'Home', icon: '', id: '#top', },
    {title: 'About us', icon: '', id: '#about', },
    {title: 'Doctors', icon: '', id: '#doctors', },
    {title: 'Services', icon: '', id: '#services', },
    {title: 'Testimonials ', icon: '', id: '#testimonials', },
    // {title: 'Patient Story', icon: '', id: '#patient_story', },
    // {title: 'My Work', icon: '', id: '#work', },
]

export const header_list = [
    { icon: '/icons/code-icon.png', title: 'Doctor Schedule', description: 'Find and schedule appointments with top doctors at your preferred hospital', },
    { icon: '/icons/edu-icon.png', title: 'Room Info', description: 'Immediate access to emergency care. Find the nearest hospital and get urgent help.', },
    { icon: '/icons/project-icon.png', title: 'Online Registration', description: 'Find and schedule appointments with top doctors at your preferred hospital.', },
]
export const about_list = [
    { icon: '/icons/code-icon.png', count: '41', description: 'Our Hospitals', },
    { icon: '/icons/edu-icon.png', count: '12K', description: 'Medical Personnel', },
    { icon: '/icons/project-icon.png', count: '500K', description: 'Patients Served', },
    { icon: '/icons/code-icon.png', count: '400', description: 'Insurance Partners', },
]

export const doctor_slider_list = [
    {
        img: '/' , title: "General Practitioner", count: '50+', description: 'Routine check-ups, common illnesses, and health management with a general practitional.'
    },
    {
        img: '/' , title: "Pediatrician", count: '20+', description: 'The best pediatrician to ensure your child\'s health from infancy to adolescence.'
    },
    {
        img: '/' , title: "Psychiatrist", count: '15', description: 'Access professional mental health support, therapy and psychiatric care.'
    },
    {
        img: '/' , title: "Dermatologist", count: '18', description: 'Expert on skin conditions...'
    },
]

export const footer_list = [
    { title: 'PERSONAL', items: ['Our Services', 'Online Consultation', 'Medical Orders', 'Policies & Terms'], },
    { title: 'BUSINESS', items: ['Medical Services', 'Healthcare Marketplace', 'Partner App', 'Clinic Porter'], },
    { title: 'ABOUT', items: ['About us', 'News & Article', 'Privacy Policy', 'Customer Service'], },
]

export const signup_roles = [
    {role: 'patient', img: '/icons/patient-role.svg', title: 'Sign Up as a Patient'},
    {role: 'physician', img: '/icons/physician-role.svg', title: 'Sign Up as a Physician'},
]

export const third_parthy_auth = [
    {name: 'Google', icon: '/icons/google-icon.png', id: 'google' },
    {name: 'Facebook', icon: '/icons/facebook-icon.png', id: 'facebook' },
    {name: 'Apple', icon: '/icons/apple-icon.png', id: 'apple' },
    {name: 'Email', icon: '/icons/email-icon.png', id: 'email' },
]

export const route_list = [
    {name: 'Dashboard', icon: Home , path: '/dashboard', id: 'dashboard' },
    {name: 'Appointments', icon:CalendarClock , path: '/appointments', id: 'appointments' },
    {name: 'Medical Records', icon: FileHeart, path: '/medical-records', id: 'medical_records' },
    {name: 'Wallet Funding', icon: WalletCards , path: '/wallet-funding', id: 'wallet_funding' },
    {name: 'Settings', icon: Settings , path: '/settings', id: 'settings' },
    {name: 'Logout', icon: LogOut , path: '/logout', id: 'logout' },
]
export const consultation_card_list = [
    {
        registered_as: 'Orthopaedist',
        last_name: 'MaCallaham',
        first_name: 'Jonathan',
        img: '/profile-img-2a.jpg',
        appointment_date: 1753459209, // May 23, 2025, 00:00:09 GMT
        languages_spoken: 'English, Spanish',
        description: 'Specializing in musculoskeletal care, I help patients regain mobility and manage pain through personalized treatment plans.'
    },
    {
        registered_as: 'Gynecologist',
        last_name: 'Smith',
        first_name: 'Emily',
        img: '/profile-img-2b.jpg',
        appointment_date: 1753527609, // May 23, 2025, 19:00:09 GMT
        languages_spoken: 'English, Spanish, Korean',
        description: 'Dedicated to women’s health, I provide compassionate care for reproductive and gynecological needs.'
    },
    {
        registered_as: 'General Doctor',
        last_name: 'Johnson',
        first_name: 'Michael',
        img: '/profile-img-2c.jpg',
        appointment_date: 1753545609, // May 24, 2025, 00:00:09 GMT
        languages_spoken: 'English, Spanish',
        description: 'As a primary care physician, I focus on comprehensive health management and preventive care for all ages.'
    },
    {
        registered_as: 'Optamologist',
        last_name: 'Brown',
        first_name: 'Sarah',
        img: '/profile-img-2d.jpg',
        appointment_date: 1758974280, // Jul 27, 2025, 16:38:00 GMT
        languages_spoken: 'English, Spanish',
        description: 'I offer expert eye care, from vision correction to managing complex eye conditions, to ensure optimal eye health.'
    },
    {
        registered_as: 'Dentist',
        last_name: 'Davis',
        first_name: 'Robert',
        img: '/profile-img-2e.jpg',
        appointment_date: 1753380009, // May 22, 2025, 03:20:09 GMT
        languages_spoken: 'English, Spanish',
        description: 'Committed to oral health, I provide thorough dental care, from routine cleanings to advanced procedures.'
    }
];
export const transaction_history = [
    {
        date: 1758512400, // July 23, 2025, 11:40 AM WAT
        transaction_type: 'debit',
        narration: 'Appointment booking for Orthopaedist',
        amount: 150.00,
        transaction_id: '8f6c7e3a-9b2c-4f8e-a1b9-6d4e3f7b9c2a'
    },
    {
        date: 1758598800, // July 24, 2025, 11:40 AM WAT
        transaction_type: 'credit',
        narration: 'Wallet top-up via bank transfer',
        amount: 500.00,
        transaction_id: '3b9d6e2f-5a7d-4c1b-9e3a-2f8c6b4d0e9f'
    },
    {
        date: 1758685200, // July 25, 2025, 11:40 AM WAT
        transaction_type: 'debit',
        narration: 'Consultation fee for Gynecologist',
        amount: 200.00,
        transaction_id: '7c4a8d0e-1b3f-4e9a-8c2b-5d6e7f0a3c8d'
    },
    {
        date: 1758771600, // July 26, 2025, 11:40 AM WAT
        transaction_type: 'debit',
        narration: 'Cancellation fee for missed appointment',
        amount: 50.00,
        transaction_id: '9e2b5c7a-4d1f-4b8e-9a3c-6f0d8e2b7c4a'
    },
    {
        date: 1758858000, // July 27, 2025, 11:40 AM WAT
        transaction_type: 'credit',
        narration: 'Refund for cancelled consultation',
        amount: 100.00,
        transaction_id: '2a6d9f1b-8c3e-4a7d-9b2c-5e8f0d3a6b9e'
    },
    {
        date: 1758944400, // July 28, 2025, 11:40 AM WAT
        transaction_type: 'debit',
        narration: 'Lab test booking',
        amount: 75.00,
        transaction_id: '4c8e2b9f-6a3d-4e7b-9c1a-3f5d8b2e6a4c'
    },
    {
        date: 1759030800, // July 29, 2025, 11:40 AM WAT
        transaction_type: 'credit',
        narration: 'Wallet top-up via card',
        amount: 300.00,
        transaction_id: '6b3f8c1a-2d9e-4b7c-8a2f-5c6e9d3b7f2a'
    },
    {
        date: 1759117200, // July 30, 2025, 11:40 AM WAT
        transaction_type: 'debit',
        narration: 'Pharmacy order payment',
        amount: 120.00,
        transaction_id: '8d4f9e2b-3c1a-4f8e-9b3c-6a7f0e4c8d5b'
    },
    {
        date: 1759203600, // July 31, 2025, 11:40 AM WAT
        transaction_type: 'credit',
        narration: 'Cashback for referral',
        amount: 25.00,
        transaction_id: '1a5c7e3d-4b2f-4e9a-8c4b-6f8d0e5a9c6d'
    },
    {
        date: 1759290000, // Aug 1, 2025, 11:40 AM WAT
        transaction_type: 'debit',
        narration: 'Teleconsultation fee',
        amount: 80.00,
        transaction_id: '2b6d8f4e-5c3a-4b7e-9d5c-7a9e0f6b1c7e'
    },
    {
        date: 1759376400, // Aug 2, 2025, 11:40 AM WAT
        transaction_type: 'credit',
        narration: 'Wallet top-up via mobile money',
        amount: 200.00,
        transaction_id: '3c7e9f5b-6d4a-4c8e-9e6d-8b0f1a7c2d8f'
    },
    {
        date: 1759462800, // Aug 3, 2025, 11:40 AM WAT
        transaction_type: 'debit',
        narration: 'Appointment booking for Dentist',
        amount: 90.00,
        transaction_id: '4d8f0a6c-7e5b-4d9a-9f7e-9c1a2b8d3e9a'
    },
    {
        date: 1759549200, // Aug 4, 2025, 11:40 AM WAT
        transaction_type: 'debit',
        narration: 'Diagnostic test fee',
        amount: 110.00,
        transaction_id: '5e9a1b7d-8f6c-4e0b-9a8f-0d2b3c9e4f0b'
    },
    {
        date: 1759635600, // Aug 5, 2025, 11:40 AM WAT
        transaction_type: 'credit',
        narration: 'Refund for overcharged service',
        amount: 60.00,
        transaction_id: '6f0b2c8e-9a7d-4f1c-9b9a-1e3c4d0f5a1c'
    },
    {
        date: 1759722000, // Aug 6, 2025, 11:40 AM WAT
        transaction_type: 'debit',
        narration: 'Follow-up consultation fee',
        amount: 70.00,
        transaction_id: '7a1c3d9f-0b8e-4a2d-9c0b-2f4d5e1a6b2d'
    }
];