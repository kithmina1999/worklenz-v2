export const simpleDateFormat = (date: Date | null): string => {
    if (!date) return ''

    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
    }

    const currentYear = new Date().getFullYear()
    const inputYear = date.getFullYear()

    // Add year to the format if it's not the current year
    if (inputYear !== currentYear) {
        options.year = 'numeric'
    }

    return new Intl.DateTimeFormat('en-US', options).format(date)
}
