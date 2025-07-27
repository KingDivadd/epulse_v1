import { Home, CalendarClock, FileHeart, WalletCards, CreditCard, Settings, LogOut, Languages, Stethoscope } from 'lucide-react';

import { RiDashboardFill, RiCalendar2Fill, RiStethoscopeFill, RiWallet3Fill, RiSettings3Fill, RiLogoutBoxRLine } from 'react-icons/ri'


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
    { name: 'Dashboard', icon: RiDashboardFill, path: '/dashboard', id: 'dashboard' },
    { name: 'Appointments', icon: RiCalendar2Fill, path: '/appointments', id: 'appointments' },
    { name: 'Consult Doctor', icon: RiStethoscopeFill, path: '/doctors', id: 'doctors' },
    // { name: 'Medical Records', icon: , path: '/medical-records', id: 'medical_records' },
    { name: 'Wallet Funding', icon: RiWallet3Fill, path: '/wallet-funding', id: 'wallet-funding' },
    { name: 'Settings', icon: RiSettings3Fill, path: '/settings', id: 'settings' },
    { name: 'Logout', icon: RiLogoutBoxRLine, path: '/login', id: 'logout' },
];

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

export const doctors_specialties = [
    "Allergy and Immunology",
    "Anesthesiology",
    "Cardiology",
    "Dermatology",
    "Dentist",
    "Emergency Medicine",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "General Surgery",
    "Geriatric Medicine",
    "Hematology",
    "Infectious Disease",
    "Internal Medicine",
    "Nephrology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedic Surgery",
    "Otolaryngology",
    "Pediatrics",
    "Physical Medicine and Rehabilitation",
    "Plastic Surgery",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Urology"
]

export const registered_doctors = [
  {
    "physician_id": "550e8400-e29b-41d4-a716-446655440000",
    "first_name": "Aisha",
    "last_name": "Okeke",
    "country": "Nigeria",
    "languages_spoken": ["English", "Yoruba"],
    "avatar": "https://images.unsplash.com/photo-1576091160550-2173fdabea36?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Cardiology",
    "description": "With over 20 years of extensive experience in the field, I focus on cardiovascular diagnostics and heart failure management, aiming to improve patient outcomes and advance cardiac care innovation.",
    "current_hospital_or_clinic": "Lagos Heart Center"
  },
  {
    "physician_id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "first_name": "James",
    "last_name": "Wilson",
    "country": "United States",
    "languages_spoken": ["English", "Spanish"],
    "avatar": "https://images.unsplash.com/photo-1576091160397-57d467c91409?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "general_doctor",
    "speciality": "General Practice",
    "description": "With over 15 years of extensive experience in the field, I focus on preventive care and chronic disease management, aiming to improve patient outcomes and advance community health practices.",
    "current_hospital_or_clinic": "Springfield Community Clinic"
  },
  {
    "physician_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "first_name": "Priya",
    "last_name": "Sharma",
    "country": "India",
    "languages_spoken": ["Hindi", "English"],
    "avatar": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Dermatology",
    "description": "With over 18 years of extensive experience in the field, I focus on skin health and cosmetic dermatology, aiming to improve patient outcomes and advance dermatological research.",
    "current_hospital_or_clinic": "Mumbai Skin Institute"
  },
  {
    "physician_id": "8d6c8a4b-3b6e-4f2a-b8c9-1f2d3e4f5b6c",
    "first_name": "Carlos",
    "last_name": "Mendes",
    "country": "Brazil",
    "languages_spoken": ["Portuguese", "English"],
    "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea6f8828?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Dentist",
    "description": "With over 22 years of extensive experience in the field, I focus on restorative dentistry and orthodontics, aiming to improve patient outcomes and advance dental care techniques.",
    "current_hospital_or_clinic": "Rio Dental Clinic"
  },
  {
    "physician_id": "9e7f9b5c-4c7f-5g3b-c9d0-2g3e4f5g6c7d",
    "first_name": "Sophie",
    "last_name": "Taylor",
    "country": "United Kingdom",
    "languages_spoken": ["English"],
    "avatar": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Pediatrics",
    "description": "With over 20 years of extensive experience in the field, I focus on childhood development and infectious diseases, aiming to improve patient outcomes and advance pediatric care standards.",
    "current_hospital_or_clinic": "London Children’s Hospital"
  },
  {
    "physician_id": "af8g0c6d-5d8g-6i4c-dae1-3i4f5g6i7e8f",
    "first_name": "Mohammed",
    "last_name": "Khan",
    "country": "Pakistan",
    "languages_spoken": ["Urdu", "English"],
    "avatar": "https://images.unsplash.com/photo-1594824476934-3a4b9d6b7b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Neurology",
    "description": "With over 20 years of extensive experience in the field, I focus on neurocritical care and neurodegenerative conditions, aiming to improve patient outcomes and advance neurological research.",
    "current_hospital_or_clinic": "Karachi Neuro Clinic"
  },
  {
    "physician_id": "b0g2i8e9-6e9i-7j5d-ebf2-4j5g6i8j9f0g",
    "first_name": "Elena",
    "last_name": "Rodriguez",
    "country": "Spain",
    "languages_spoken": ["Spanish", "English"],
    "avatar": "https://images.unsplash.com/photo-1579684453423-8a6b9f3b7e7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "general_doctor",
    "speciality": "General Practice",
    "description": "With over 17 years of extensive experience in the field, I focus on holistic primary care and chronic illness management, aiming to improve patient outcomes and advance preventive medicine.",
    "current_hospital_or_clinic": "Madrid Family Clinic"
  },
  {
    "physician_id": "c1h3j9fa-7fai-8k6e-fcg3-5k6i7j9k0g1h",
    "first_name": "Chinwe",
    "last_name": "Adebayo",
    "country": "Nigeria",
    "languages_spoken": ["English", "Igbo"],
    "avatar": "https://images.unsplash.com/photo-1594824476934-3a4b9d6b7b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Obstetrics and Gynecology",
    "description": "With over 25 years of extensive experience in the field, I focus on women’s reproductive health and prenatal care, aiming to improve patient outcomes and advance maternal health practices.",
    "current_hospital_or_clinic": "Abuja Women’s Hospital"
  },
  {
    "physician_id": "d2i4k0gb-8gbj-9l7f-gdh4-6l7j8k0l1i2j",
    "first_name": "Hiroshi",
    "last_name": "Tanaka",
    "country": "Japan",
    "languages_spoken": ["Japanese", "English"],
    "avatar": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Neurology",
    "description": "With over 23 years of extensive experience in the field, I focus on epilepsy management and stroke care, aiming to improve patient outcomes and advance neurological treatment methodologies.",
    "current_hospital_or_clinic": "Tokyo Neuro Clinic"
  },
  {
    "physician_id": "e3j5l1hc-9hck-al8g-hei5-7m8k9l1m2j3k",
    "first_name": "Fatima",
    "last_name": "Ali",
    "country": "Egypt",
    "languages_spoken": ["Arabic", "English"],
    "avatar": "https://images.unsplash.com/photo-1576091160397-57d467c91409?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Ophthalmology",
    "description": "With over 19 years of extensive experience in the field, I focus on cataract surgery and glaucoma treatment, aiming to improve patient outcomes and advance vision care technologies.",
    "current_hospital_or_clinic": "Cairo Eye Institute"
  },
  {
    "physician_id": "f4k6m2id-aidl-bm9h-ifj6-8n9l0m2n3k4l",
    "first_name": "Lucas",
    "last_name": "Moreira",
    "country": "Brazil",
    "languages_spoken": ["Portuguese", "Spanish"],
    "avatar": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Gastroenterology",
    "description": "With over 21 years of extensive experience in the field, I focus on endoscopic procedures and liver disease management, aiming to improve patient outcomes and advance digestive health research.",
    "current_hospital_or_clinic": "São Paulo Gastro Clinic"
  },
  {
    "physician_id": "g5l7n3je-bjem-cn0i-jgk7-9o0m1n3o4l5m",
    "first_name": "Amara",
    "last_name": "Diallo",
    "country": "Senegal",
    "languages_spoken": ["French", "Wolof", "English"],
    "avatar": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "general_doctor",
    "speciality": "General Practice",
    "description": "With over 16 years of extensive experience in the field, I focus on community health and preventive care, aiming to improve patient outcomes and advance public health initiatives.",
    "current_hospital_or_clinic": "Dakar Community Clinic"
  },
  {
    "physician_id": "h6m8o4kf-ckfn-do1j-khl8-ap1n2o4p5m6n",
    "first_name": "Anna",
    "last_name": "Schmidt",
    "country": "Germany",
    "languages_spoken": ["German", "English"],
    "avatar": "https://images.unsplash.com/photo-1576091160550-2173fdabea36?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Psychiatry",
    "description": "With over 24 years of extensive experience in the field, I focus on mood disorders and therapeutic interventions, aiming to improve patient outcomes and advance mental health care practices.",
    "current_hospital_or_clinic": "Berlin Mental Health Center"
  },
  {
    "physician_id": "i7n9p5lg-dlgo-ep2k-lim9-bq2o3p5q6n7o",
    "first_name": "Sanjay",
    "last_name": "Patel",
    "country": "India",
    "languages_spoken": ["Hindi", "English", "Gujarati"],
    "avatar": "https://images.unsplash.com/photo-1594824476934-3a4b9d6b7b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Urology",
    "description": "With over 20 years of extensive experience in the field, I focus on kidney stone treatment and prostate health, aiming to improve patient outcomes and advance urological care techniques.",
    "current_hospital_or_clinic": "Ahmedabad Urology Clinic"
  },
  {
    "physician_id": "j8o0q6mh-emhp-fq3l-mjna-cr3p4q6r7o8p",
    "first_name": "Isabelle",
    "last_name": "Dubois",
    "country": "France",
    "languages_spoken": ["French", "English"],
    "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea6f8828?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "registered_as": "specialist",
    "speciality": "Endocrinology",
    "description": "With over 22 years of extensive experience in the field, I focus on diabetes management and thyroid disorders, aiming to improve patient outcomes and advance endocrine health research.",
    "current_hospital_or_clinic": "Paris Endocrine Clinic"
  }
];

export const genotypes = ['AA', 'AS', 'AC', 'SS', 'SC', 'CC'];

export const blood_groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];