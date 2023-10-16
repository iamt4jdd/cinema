

const timeStringToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 60) + minutes + (seconds / 60);
}

const formatDate = (inputDate) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(inputDate).toLocaleDateString('en-US', options);
}

const getDayOfWeek = (inputDate) => {
    const date = new Date(inputDate);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getUTCDay()];
}

const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`
}




export default { timeStringToMinutes, formatDate, getDayOfWeek, minutesToHours}

