export const currentDateString = (): string => {
    const date = new Date()

    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const dayOfWeek = weekdays[date.getDay()]
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    return `Today is ${dayOfWeek}, ${month} ${day}, ${year}`
}
