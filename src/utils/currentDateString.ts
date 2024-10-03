import dayjs from 'dayjs'

export const currentDateString = (): string => {
    const date = dayjs()

    return `Today is ${date.format('dddd, MMMM DD, YYYY')}`
}
