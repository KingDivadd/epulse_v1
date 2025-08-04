import { RiDashboardFill, RiCalendar2Fill, RiStethoscopeFill, RiChat4Line , RiWallet3Fill, RiSettings3Fill, RiLogoutBoxRLine } from 'react-icons/ri'
import { FiUser } from "react-icons/fi";
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { MdCheckCircleOutline, MdOutlineCancel } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { HiOutlineClock } from 'react-icons/hi';
import { FaHandsHelping, FaUsers, FaUserMd, FaHospital ,FaCalendarAlt, FaVideo, FaUserPlus } from 'react-icons/fa';

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
    { icon: FaCalendarAlt , title: 'Doctor Schedule', description: 'Book appointments with top doctors at your preferred time and hospital.' },
    { icon: FaVideo , title: 'Virtual Rooms', description: 'Join secure video consultations with doctors from anywhere.' },
    { icon: FaUserPlus , title: 'Online Registration', description: 'Sign up or log in to access personalized healthcare services.' },
]
export const about_list = [
    { icon: FaHospital, count: '41', description: 'Our Hospitals', icon_color:'text-indigo-500', bg_color: 'bg-indigo-500/10'},
    { icon: FaUserMd, count: '12K', description: 'Medical Personnel', icon_color:'text-teal-500', bg_color: 'bg-teal-500/10' },
    { icon: FaUsers, count: '500K', description: 'Patients Served', icon_color:'text-green-500', bg_color: 'bg-green-500/10' },
    { icon: FaHandsHelping, count: '400', description: 'Collaborators',icon_color:'text-[#306ce9]', bg_color: 'bg-[#306ce9]/10' },
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
    {
        img: '/' , title: "General Practitioner", count: '50+', description: 'Routine check-ups, common illnesses, and health management with a general practitional.'
    },
    {
        img: '/' , title: "Pediatrician", count: '20+', description: 'The best pediatrician to ensure your child\'s health from infancy to adolescence.'
    },
]

export const categories_doctor_list = [
    {
        specialty: 'Allergy and Immunology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Doctor with patient, allergy focus
        number_of_doctors: 15,
        description: 'Diagnosis and treatment of allergies, asthma, and immune system disorders.',
    },
    {
        specialty: 'Anesthesiology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Anesthesiologist in surgery
        number_of_doctors: 12,
        description: 'Management of pain relief and sedation during surgical procedures.',
    },
    {
        specialty: 'Cardiology',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Cardiologist with heart monitor
        number_of_doctors: 20,
        description: 'Care for heart conditions, including heart disease and hypertension.',
    },
    {
        specialty: 'Dermatology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Dermatologist examining skin
        number_of_doctors: 18,
        description: 'Treatment of skin conditions, including acne, eczema, and skin cancer.',
    },
    {
        specialty: 'Dentist',
        img: 'https://images.pexels.com/photos/40561/dentist-dentistry-teeth-care-40561.jpeg?auto=compress&cs=tinysrgb&w=80', // Dentist with tools
        number_of_doctors: 25,
        description: 'Oral health care, including teeth cleaning, fillings, and extractions.',
    },
    {
        specialty: 'Emergency Medicine',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Emergency room doctor
        number_of_doctors: 30,
        description: 'Immediate care for acute illnesses and injuries in emergency settings.',
    },
    {
        specialty: 'Endocrinology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Endocrinologist with patient
        number_of_doctors: 10,
        description: 'Management of hormone-related disorders like diabetes and thyroid issues.',
    },
    {
        specialty: 'Family Medicine',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Family doctor with family
        number_of_doctors: 40,
        description: 'Comprehensive care for individuals and families across all ages.',
    },
    {
        specialty: 'Gastroenterology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Gastroenterologist with equipment
        number_of_doctors: 15,
        description: 'Diagnosis and treatment of digestive system disorders.',
    },
    {
        specialty: 'General Surgery',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Surgeon in operating room
        number_of_doctors: 22,
        description: 'Surgical treatment for a wide range of conditions and injuries.',
    },
    {
        specialty: 'Geriatric Medicine',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Geriatric doctor with elderly patient
        number_of_doctors: 12,
        description: 'Specialized care for the health needs of older adults.',
    },
    {
        specialty: 'Hematology',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Hematologist with blood sample
        number_of_doctors: 8,
        description: 'Treatment of blood disorders, including anemia and leukemia.',
    },
    {
        specialty: 'Infectious Disease',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Infectious disease specialist
        number_of_doctors: 14,
        description: 'Management of infections caused by bacteria, viruses, and fungi.',
    },
    {
        specialty: 'Internal Medicine',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Internist with patient
        number_of_doctors: 35,
        description: 'Comprehensive care for adult patients with complex health issues.',
    },
    {
        specialty: 'Nephrology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Nephrologist with kidney model
        number_of_doctors: 10,
        description: 'Care for kidney diseases and disorders, including dialysis support.',
    },
    {
        specialty: 'Neurology',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Neurologist with brain scan
        number_of_doctors: 16,
        description: 'Diagnosis and treatment of nervous system disorders.',
    },
    {
        specialty: 'Obstetrics and Gynecology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // OB/GYN with patient
        number_of_doctors: 20,
        description: 'Care for women’s reproductive health and pregnancy.',
    },
    {
        specialty: 'Oncology',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Oncologist with patient
        number_of_doctors: 13,
        description: 'Treatment of cancer through chemotherapy, radiation, and surgery.',
    },
    {
        specialty: 'Ophthalmology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Ophthalmologist with eye exam
        number_of_doctors: 17,
        description: 'Medical and surgical care for eye conditions and vision.',
    },
    {
        specialty: 'Orthopedic Surgery',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Orthopedic surgeon with cast
        number_of_doctors: 19,
        description: 'Surgical and non-surgical treatment of bone and joint disorders.',
    },
    {
        specialty: 'Otolaryngology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // ENT specialist with equipment
        number_of_doctors: 11,
        description: 'Care for ear, nose, and throat conditions and surgeries.',
    },
    {
        specialty: 'Pediatrics',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Pediatrician with child
        number_of_doctors: 28,
        description: 'Health care for infants, children, and adolescents.',
    },
    {
        specialty: 'Physical Medicine and Rehabilitation',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Rehab specialist with patient
        number_of_doctors: 9,
        description: 'Rehabilitation for physical disabilities and injuries.',
    },
    {
        specialty: 'Plastic Surgery',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Plastic surgeon in operation
        number_of_doctors: 14,
        description: 'Cosmetic and reconstructive surgical procedures.',
    },
    {
        specialty: 'Psychiatry',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Psychiatrist with patient
        number_of_doctors: 16,
        description: 'Mental health care, including therapy and medication management.',
    },
    {
        specialty: 'Pulmonology',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Pulmonologist with lung model
        number_of_doctors: 10,
        description: 'Treatment of lung and respiratory system conditions.',
    },
    {
        specialty: 'Radiology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Radiologist with X-ray
        number_of_doctors: 21,
        description: 'Imaging-based diagnosis and treatment using X-rays and scans.',
    },
    {
        specialty: 'Rheumatology',
        img: 'https://images.pexels.com/photos/6695232/pexels-photo-6695232.jpeg?auto=compress&cs=tinysrgb&w=80', // Rheumatologist with patient
        number_of_doctors: 8,
        description: 'Care for autoimmune and joint-related diseases like arthritis.',
    },
    {
        specialty: 'Urology',
        img: 'https://images.pexels.com/photos/4173232/pexels-photo-4173232.jpeg?auto=compress&cs=tinysrgb&w=80', // Urologist with equipment
        number_of_doctors: 13,
        description: 'Treatment of urinary tract and male reproductive system disorders.',
    },
];

export const testimonial_list = [
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Aisha',
        country: 'Nigeria',
        country_img: 'https://flagcdn.com/w80/ng.png',
        testimonial: "I was amazed at how easy it was to consult a specialist through ePulse. The video call quality was excellent, and my doctor was very supportive!"
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'John',
        country: 'United States',
        country_img: 'https://flagcdn.com/w80/us.png',
        testimonial: "ePulse made my first online appointment a breeze. The doctor understood my concerns and provided a clear treatment plan in no time!"
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Fatima',
        country: 'Kenya',
        country_img: 'https://flagcdn.com/w80/ke.png',
        testimonial: "Finding a doctor online was never this simple! ePulse connected me with an expert who helped me manage my condition effectively."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Carlos',
        country: 'Brazil',
        country_img: 'https://flagcdn.com/w80/br.png',
        testimonial: "I love how ePulse saved me a trip to the clinic. The chat feature with my doctor was incredibly convenient and insightful."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Priya',
        country: 'India',
        country_img: 'https://flagcdn.com/w80/in.png',
        testimonial: "Thanks to ePulse, I got a second opinion from a top specialist without leaving home. The experience was seamless and professional!"
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Mohammed',
        country: 'Egypt',
        country_img: 'https://flagcdn.com/w80/eg.png',
        testimonial: "ePulse transformed my healthcare journey. The doctor I consulted was knowledgeable, and the process was hassle-free."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Sophie',
        country: 'France',
        country_img: 'https://flagcdn.com/w80/fr.png',
        testimonial: "I was skeptical about online consultations, but ePulse proved me wrong. My doctor was thorough and very approachable!"
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Ahmed',
        country: 'South Africa',
        country_img: 'https://flagcdn.com/w80/za.png',
        testimonial: "ePulse made it easy to book an appointment with a specialist. The follow-up care advice was spot-on and helpful."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Maria',
        country: 'Mexico',
        country_img: 'https://flagcdn.com/w80/mx.png',
        testimonial: "The speed of service on ePulse is incredible! I got a consultation within hours, and the doctor was very caring."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Liam',
        country: 'Canada',
        country_img: 'https://flagcdn.com/w80/ca.png',
        testimonial: "ePulse connected me with a doctor who understood my needs perfectly. The video call was clear, and the advice was great!"
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Zara',
        country: 'Pakistan',
        country_img: 'https://flagcdn.com/w80/pk.png',
        testimonial: "I’m so glad I used ePulse. The doctor I met online was professional, and the platform was user-friendly."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Emmanuel',
        country: 'Ghana',
        country_img: 'https://flagcdn.com/w80/gh.png',
        testimonial: "ePulse saved me time and effort. The specialist I consulted gave me a detailed plan that worked wonders!"
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Elena',
        country: 'Spain',
        country_img: 'https://flagcdn.com/w80/es.png',
        testimonial: "The convenience of ePulse is unmatched. My doctor was kind, and the consultation felt just like an in-person visit."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Kwame',
        country: 'Uganda',
        country_img: 'https://flagcdn.com/w80/ug.png',
        testimonial: "ePulse made healthcare accessible for me. The doctor’s advice was clear, and the process was smooth."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Hiroshi',
        country: 'Japan',
        country_img: 'https://flagcdn.com/w80/jp.png',
        testimonial: "I was impressed by how quickly ePulse connected me with a specialist. The experience was top-notch!"
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Lina',
        country: 'Germany',
        country_img: 'https://flagcdn.com/w80/de.png',
        testimonial: "ePulse turned my healthcare worries into relief. The doctor was attentive, and the platform was easy to navigate."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Omar',
        country: 'Morocco',
        country_img: 'https://flagcdn.com/w80/ma.png',
        testimonial: "Thanks to ePulse, I got expert advice without the travel. The consultation was detailed and reassuring."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Sofia',
        country: 'Italy',
        country_img: 'https://flagcdn.com/w80/it.png',
        testimonial: "ePulse made my online doctor visit stress-free. The specialist was knowledgeable, and the support was great!"
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Tunde',
        country: 'Senegal',
        country_img: 'https://flagcdn.com/w80/sn.png',
        testimonial: "I highly recommend ePulse. The doctor I consulted was fantastic, and the process was quick and efficient."
    },
    {
        img: 'https://via.placeholder.com/80',
        first_name: 'Anna',
        country: 'Australia',
        country_img: 'https://flagcdn.com/w80/au.png',
        testimonial: "ePulse brought healthcare to my doorstep. The video consultation was smooth, and the doctor was very helpful!"
    },
];

export const service_list = [
    {
        img: 'https://via.placeholder.com/80?text=Video+Call', // Placeholder for video call icon
        title: 'Virtual Consultation',
        description: 'Connect with a doctor via video call for a personalized health checkup from anywhere.',
    },
    {
        img: 'https://via.placeholder.com/80?text=Chat', // Placeholder for chat icon
        title: 'Live Chat Support',
        description: 'Get instant medical advice through secure text-based consultations with experts.',
    },
    {
        img: 'https://via.placeholder.com/80?text=Prescription', // Placeholder for prescription icon
        title: 'Online Prescriptions',
        description: 'Receive digital prescriptions and have them delivered or filled at your pharmacy.',
    },
    {
        img: 'https://via.placeholder.com/80?text=Follow-Up', // Placeholder for follow-up icon
        title: 'Follow-Up Care',
        description: 'Schedule follow-up appointments to monitor your health progress remotely.',
    },
    {
        img: 'https://via.placeholder.com/80?text=Diagnosis', // Placeholder for diagnosis icon
        title: 'Remote Diagnosis',
        description: 'Get accurate diagnoses using uploaded medical reports and live consultations.',
    },
    {
        img: 'https://via.placeholder.com/80?text=Mental+Health', // Placeholder for mental health icon
        title: 'Mental Health Support',
        description: 'Access therapy sessions with licensed counselors via video or chat.',
    },
    {
        img: 'https://via.placeholder.com/80?text=Lab+Results', // Placeholder for lab results icon
        title: 'Lab Result Review',
        description: 'Upload lab results for expert analysis and personalized feedback.',
    },
    {
        img: 'https://via.placeholder.com/80?text=Second+Opinion', // Placeholder for second opinion icon
        title: 'Second Opinion',
        description: 'Consult another specialist for a second opinion on your medical condition.',
    },
    {
        img: 'https://via.placeholder.com/80?text=Wellness', // Placeholder for wellness icon
        title: 'Wellness Coaching',
        description: 'Receive guidance on fitness, nutrition, and mental well-being from experts.',
    },
    {
        img: 'https://via.placeholder.com/80?text=Emergency', // Placeholder for emergency icon
        title: 'Emergency Guidance',
        description: 'Get immediate advice for urgent health issues until you reach a facility.',
    },
];

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
    { name: 'Dashboard', icon: RiDashboardFill, path: '/dashboard', id: 'dashboard', role: ['patient', 'physician'] },
    { name: 'Appointments', icon: RiCalendar2Fill, path: '/appointments', id: 'appointments', role: ['patient', 'physician'] },
    { name: 'Consult Doctor', icon: RiStethoscopeFill, path: '/doctors', id: 'doctors', role: ['patient',] },
    { name: 'Consultation', icon: RiChat4Line , path: '/consultation', id: 'consultation', role: ['patient', 'physician'] },
    { name: 'Wallet', icon: RiWallet3Fill, path: '/wallet', id: 'wallet-funding', role: ['patient', 'physician'] },
    { name: 'Profile', icon: FiUser, path: '/profile', id: 'profile', role: [ 'physician', 'patient'] },
    { name: 'Logout', icon: RiLogoutBoxRLine, path: '/login', id: 'logout', role: ['patient', 'physician'] },
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
    },
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

export const messages_data = [
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'physician',
        name: 'Sophia Wong',
        text: 'Hello! How can I assist you today?',
        image: '/profile-img-2b.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (5 * 60 * 60), // 11:00 WAT (6 hours before 17:05)
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440003',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'patient',
        name: 'You',
        text: 'Hi, I have some questions about my appointment.',
        image: '/profile-img-2d.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (4 * 60 * 60) + (2 * 60), // 11:02 WAT
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440004',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'physician',
        name: 'Sophia Wong',
        text: 'Sure, please let me know your appointment details.',
        image: '/profile-img-2b.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (4 * 60 * 60) + (3 * 60), // 11:03 WAT
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440005',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'patient',
        name: 'You',
        text: 'It’s scheduled for tomorrow at 10 AM.',
        image: '/profile-img-2d.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (4 * 60 * 60) + (4 * 60), // 11:04 WAT
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440006',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'patient',
        name: 'You',
        text: 'Hi, I have some questions about my appointment.',
        image: '/profile-img-2d.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (4 * 60 * 60) + (2 * 60), // 11:02 WAT
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440007',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'physician',
        name: 'Sophia Wong',
        text: 'Sure, please let me know your appointment details.',
        image: '/profile-img-2b.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (4 * 60 * 60) + (3 * 60), // 11:03 WAT
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440008',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'patient',
        name: 'You',
        text: 'It’s scheduled for tomorrow at 10 AM.',
        image: '/profile-img-2d.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (4 * 60 * 60) + (4 * 60), // 11:04 WAT
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440009',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'patient',
        name: 'You',
        text: 'Hi, I have some questions about my appointment.',
        image: '/profile-img-2d.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (4 * 60 * 60) + (2 * 60), // 11:02 WAT
    },
    {
        id: '550e8400-e29b-41d4-a716-44665544000a',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'physician',
        name: 'Sophia Wong',
        text: 'Sure, please let me know your appointment details.',
        image: '/profile-img-2b.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (4 * 60 * 60) + (3 * 60), // 11:03 WAT
    },
    {
        id: '550e8400-e29b-41d4-a716-44665544000b',
        patient_id: '550e8400-e29b-41d4-a716-446655440001',
        physician_id: '550e8400-e29b-41d4-a716-446655440002',
        sender: 'patient',
        name: 'You',
        text: 'It’s scheduled for tomorrow at 10 AM.',
        image: '/profile-img-2d.jpg',
        time: Math.floor(new Date('2025-07-28T16:05:00Z').getTime() / 1000) - (4 * 60 * 60) + (4 * 60), // 11:04 WAT
    },
    
];

export const metrics = [
    { name: 'All Appointments', icon: AiOutlineCalendar, id: 'all_appointments', count: 30 },
    { name: 'Pending', icon: AiOutlineClockCircle, id: 'pending', count: 10 },
    { name: 'Approved', icon: MdCheckCircleOutline, id: 'approved', count: 20 },
    { name: 'Completed', icon: FaCheckCircle, id: 'completed', count: 15 },
    // { name: 'Missed Appointments', icon: MdOutlineCancel, id: 'missed_appointments', count: 2 },
    // { name: 'Today\'s Appointments', icon: HiOutlineClock, id: 'todays_appointments', count: 3 },
];

export const physician_appointment_sample = [
  // 2 Months Ago (May 31, 2025 - June 30, 2025) - 10 entries
  { first_name: 'John', last_name: 'Doe', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1717100400, status: 'completed' }, // May 31, 2025, 09:00
  { first_name: 'Jane', last_name: 'Smith', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1717104000, status: 'missed' }, // May 31, 2025, 09:40
  { first_name: 'Michael', last_name: 'Johnson', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1717186800, status: 'approved' }, // June 1, 2025, 09:00
  { first_name: 'Emily', last_name: 'Brown', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1717190400, status: 'pending' }, // June 1, 2025, 09:40
  { first_name: 'David', last_name: 'Wilson', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1717628400, status: 'completed' }, // June 6, 2025, 09:00
  { first_name: 'Sarah', last_name: 'Davis', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1717632000, status: 'missed' }, // June 6, 2025, 09:40
  { first_name: 'James', last_name: 'Taylor', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1717947600, status: 'approved' }, // June 10, 2025, 09:00
  { first_name: 'Lisa', last_name: 'Anderson', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1717951200, status: 'pending' }, // June 10, 2025, 09:40
  { first_name: 'Robert', last_name: 'Martinez', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1718530800, status: 'completed' }, // June 18, 2025, 09:00
  { first_name: 'Mary', last_name: 'Garcia', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1718534400, status: 'missed' }, // June 18, 2025, 09:40

  // Last Month (June 30, 2025 - July 31, 2025) - 10 entries
  { first_name: 'William', last_name: 'Hernandez', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1719692400, status: 'approved' }, // June 30, 2025, 09:00
  { first_name: 'Patricia', last_name: 'Lopez', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1719696000, status: 'pending' }, // June 30, 2025, 09:40
  { first_name: 'Thomas', last_name: 'Clark', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1719778800, status: 'completed' }, // July 1, 2025, 09:00
  { first_name: 'Linda', last_name: 'Lewis', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1719782400, status: 'missed' }, // July 1, 2025, 09:40
  { first_name: 'Charles', last_name: 'Walker', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1720098000, status: 'approved' }, // July 6, 2025, 09:00
  { first_name: 'Barbara', last_name: 'Hall', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1720101600, status: 'pending' }, // July 6, 2025, 09:40
  { first_name: 'Daniel', last_name: 'Allen', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1720681200, status: 'completed' }, // July 14, 2025, 09:00
  { first_name: 'Elizabeth', last_name: 'Young', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1720684800, status: 'missed' }, // July 14, 2025, 09:40
  { first_name: 'Matthew', last_name: 'King', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1721266800, status: 'approved' }, // July 22, 2025, 09:00
  { first_name: 'Jennifer', last_name: 'Wright', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1721270400, status: 'pending' }, // July 22, 2025, 09:40

  // This Month (July 1, 2025 - July 31, 2025) - 20 entries
  // Starting 2 days ago (July 29, 2025) to today (July 31, 2025, 10:00 AM WAT)
  { first_name: 'Joseph', last_name: 'Scott', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1722226800, status: 'completed' }, // July 29, 2025, 09:00
  { first_name: 'Margaret', last_name: 'Green', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1722229200, status: 'missed' }, // July 29, 2025, 09:40
  { first_name: 'Richard', last_name: 'Adams', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1722231600, status: 'approved' }, // July 29, 2025, 10:20
  { first_name: 'Dorothy', last_name: 'Baker', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1722234000, status: 'pending' }, // July 29, 2025, 11:00
  { first_name: 'Paul', last_name: 'Nelson', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1722236400, status: 'completed' }, // July 29, 2025, 11:40
  { first_name: 'Nancy', last_name: 'Mitchell', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1722238800, status: 'missed' }, // July 29, 2025, 12:20
  { first_name: 'Mark', last_name: 'Perez', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1722241200, status: 'approved' }, // July 29, 2025, 13:00
  { first_name: 'Karen', last_name: 'Roberts', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1722243600, status: 'pending' }, // July 29, 2025, 13:40
  { first_name: 'Donald', last_name: 'Turner', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1722311600, status: 'completed' }, // July 30, 2025, 09:00
  { first_name: 'Betty', last_name: 'Phillips', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1722314000, status: 'missed' }, // July 30, 2025, 09:40
  { first_name: 'George', last_name: 'Campbell', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1722316400, status: 'approved' }, // July 30, 2025, 10:20
  { first_name: 'Helen', last_name: 'Parker', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1722318800, status: 'pending' }, // July 30, 2025, 11:00
  { first_name: 'Kenneth', last_name: 'Evans', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1722321200, status: 'completed' }, // July 30, 2025, 11:40
  { first_name: 'Sandra', last_name: 'Edwards', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1722323600, status: 'missed' }, // July 30, 2025, 12:20
  { first_name: 'Steven', last_name: 'Collins', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1722326000, status: 'approved' }, // July 30, 2025, 13:00
  { first_name: 'Donna', last_name: 'Stewart', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1722328400, status: 'pending' }, // July 30, 2025, 13:40
  { first_name: 'Edward', last_name: 'Sanchez', gender: 'Male', avatar: '/profile-img-2a.jpg', consultation_type: 'chat', time: 1722404400, status: 'completed' }, // July 31, 2025, 09:00
  { first_name: 'Ruth', last_name: 'Morris', gender: 'Female', avatar: '/profile-img-2b.jpg', consultation_type: 'video', time: 1722406800, status: 'missed' }, // July 31, 2025, 09:40
  { first_name: 'Ronald', last_name: 'Rogers', gender: 'Male', avatar: '/profile-img-2c.jpg', consultation_type: 'chat', time: 1722409200, status: 'approved' }, // July 31, 2025, 10:20
  { first_name: 'Sharon', last_name: 'Reed', gender: 'Female', avatar: '/profile-img-2d.jpg', consultation_type: 'video', time: 1722411600, status: 'pending' } // July 31, 2025, 11:00
];