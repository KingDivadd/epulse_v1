export function format_date_from_unix(appointment_date: number) {
    const date = new Date(appointment_date * 1000); // Convert Unix timestamp to milliseconds

    // Get day with ordinal suffix
    const day = date.getDate();
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix = (day % 10 <= 3 && day % 100 !== 11 && day % 100 !== 12 && day % 100 !== 13) 
        ? suffixes[day % 10] : suffixes[0];

    // Get month name
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[date.getMonth()];

    // Get time in 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format

    // Return formatted object
    return {
        date: `${day}${suffix} of ${month}`,
        time: `${hours}:${minutes}${ampm}`
    };
}

export function is_within_24hrs(appointment_date:number) {
    const today = Math.floor(Date.now() / 1000); // Current time in seconds (Unix timestamp)
    const oneDayInSeconds = 24 * 60 * 60; // 24 hours = 86,400 seconds
    
    // Check if appointment_date is within 24 hours from today
    return appointment_date >= today && appointment_date <= today + oneDayInSeconds;
}

export function is_within_12hrs(appointment_date:number) {
    const today = Math.floor(Date.now() / 1000); // Current time in seconds (Unix timestamp)
    const oneDayInSeconds = 12 * 60 * 60; // 24 hours = 86,400 seconds
    
    // Check if appointment_date is within 24 hours from today
    return appointment_date >= today && appointment_date <= today + oneDayInSeconds;
}

export function convert_to_unix(dateString: string): number {
    return Math.floor(new Date(dateString).getTime() / 1000);
}