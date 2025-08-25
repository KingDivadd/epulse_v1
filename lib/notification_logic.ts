import { NotificationType} from '@/types'
import { format_date_from_unix } from './date_formater'


export const notification_logic = (data: NotificationType) =>{
    const {notification_type, notification_sub_type, appointment, transaction, is_read} = data


    if (notification_type.toLowerCase() == 'transaction'){
        if (notification_sub_type.toLowerCase() == 'appointment_booking'){
            return {title: 'Payment Successful', message: `Your payment of ₦ ${Number(transaction?.amount).toLocaleString()} was successful. Thank you for your payment!`, type: 'success', is_read: is_read}

        }else if(notification_sub_type == 'account_withdrawal'){
            return {
                title: 'Payment Withdrawal', message: `Your withdrawal of ₦ ${Number(transaction?.amount).toLocaleString()} was successful.`, type: 'success', is_read: is_read
            }
        }else if(notification_sub_type == 'account_deposit'){
            return {
                title: 'Account Deposit', message: `Your deposit of ₦ ${Number(transaction?.amount).toLocaleString()} was successful.`, type: 'success', is_read: is_read
            }
        }else if(notification_sub_type == 'patient_unavailabe_for_appointment'){
            return{
                title: 'Unavailable for consultation', message: `You were charged ₦ ${Number(transaction?.amount).toLocaleString()} for being unavailable for your scheduled appointment.`, type: 'info', is_read: is_read
            }
        }else if (notification_sub_type == 'consultation_amount'){
            return{
                title: 'Consultation Fee', message: `You last consultation has amounted to ₦ ${Number(transaction?.amount).toLocaleString()}.`, type: 'success', is_read: is_read
            }
        }
    }
    else if (notification_type.toLowerCase() == 'appointment'){
        const date_time = format_date_from_unix(Number(appointment?.time))
        if (notification_sub_type.toLowerCase() == 'appointment_booking'){
            return {title: 'Appointment Booked', message: `Your appointment with Dr. ${appointment?.physician.first_name} ${appointment?.physician.last_name} has been successfully booked for ${date_time.date} at ${date_time.time}.`, type: 'success', is_read: is_read}

        }else if(notification_sub_type == 'appointment_accepted'){
            return {
                title: 'Appointment Accepted', message:`Your appointment with  Dr. ${appointment?.physician.first_name} ${appointment?.physician.last_name} scheduled for for ${date_time.date} at ${date_time.time} has been accepted. `, type: 'info', is_read: is_read
            }
        }else if(notification_sub_type == 'appointment_in_progress'){
            return {
                title: 'Appointment In Progress', message:`Your appointment with  Dr. ${appointment?.physician.first_name} ${appointment?.physician.last_name} scheduled for for ${date_time.date} at ${date_time.time} is now in progress.`, type: 'info', is_read: is_read
            }
        }else if(notification_sub_type == 'appointment_cancelled'){
            return{
                title: 'Appointment Cancelled', message:`Your appointment with  Dr. ${appointment?.physician.first_name} ${appointment?.physician.last_name} scheduled for for ${date_time.date} at ${date_time.time} has been cancelled.`, type: 'warning', is_read: is_read
            }
        }else if(notification_sub_type == 'appointment_completed'){
            return{
                title: 'Appointment Completed', message:`Your appointment with  Dr. ${appointment?.physician.first_name} ${appointment?.physician.last_name} scheduled for for ${date_time.date} at ${date_time.time} has been completed.`, type: 'success', is_read: is_read
            }
        }
    }
}