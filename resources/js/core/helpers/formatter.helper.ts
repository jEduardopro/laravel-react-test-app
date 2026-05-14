import { DateTime } from "luxon"


export const moneyFormat = (amount: number | string, currency = 'MXN', locale = 'es-MX'): string => {
    const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    }).format(parsedAmount)
}

export const getInitialsByName = (name: string): string => {
    return name.split(' ').reduce((acc, word) => {
        if (word && word.trim().length > 0 && acc.length < 2) {
            acc += word.at(0)?.toUpperCase()
        }

        return acc
    }, '')
}

export const dateFormat = (date: string, toFormat = 'dd-LL-yy hh:mm a'): string => {
    return DateTime.fromISO(date).toFormat(toFormat)
}

export const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone


export const formatMinutes = (minutes: number) => {
    if (minutes < 60) {
        return `${minutes} mins`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
        return `${hours} hr${hours > 1 ? "s" : ""}`;
    }

    return `${hours} hr${hours > 1 ? "s" : ""} ${remainingMinutes} mins`;
};