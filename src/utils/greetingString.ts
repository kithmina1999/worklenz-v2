export const greetingString = (name: string): string => {
    const date = new Date()
    const hours = date.getHours()
    let greet

    if (hours < 12) greet = 'morning'
    else if (hours >= 12 && hours < 16) greet = 'afternoon'
    else if (hours >= 16 && hours < 24) greet = 'evening'

    return `Hi ${name},  Good ${greet}!`
}
