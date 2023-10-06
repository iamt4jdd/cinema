

const timeStringToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 60) + minutes + (seconds / 60);
}

const formatDate = (inputDate) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(inputDate).toLocaleDateString('en-US', options);
}


export default { timeStringToMinutes, formatDate }

