import { EDateFormat } from '@/types/app'

export const getRelativeTime = (d1: Date | string, d2 = new Date()) => {
    let date1 = d1 as Date
    let date2 = d2 as Date

    if (typeof d1 === 'string') {
        date1 = new Date(d1)
    }

    if (typeof d2 === 'string') {
        date2 = new Date(d2)
    }

    const units: {
        [key: string]: number
    } = {
        year  : 24 * 60 * 60 * 1000 * 365,
        month : 24 * 60 * 60 * 1000 * 365 / 12,
        day   : 24 * 60 * 60 * 1000,
        hour  : 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000
    }

    const rtf = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'auto'
    })

    const elapsed = date1.getTime() - date2.getTime()

    for (const u in units) {
        if (Math.abs(elapsed) > units[u] || u === 'second') {
            return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit)
        }
    }
}

export const formatDate = (date?: Date | number | string, format: EDateFormat = EDateFormat.SHORT) => {
    let d = date

    if (typeof date === 'undefined' || date === null) {
        return
    }

    if (typeof d === 'string') {
        if (isNaN(d as unknown as number)) {
            d = new Date(d)
        }
        else {
            d = parseInt(d, 10)
        }
    }

    if (typeof d === 'number') {
        d = new Date(d)
    }

    if (format === EDateFormat.LONG) {
        if (d.getFullYear() === new Date().getFullYear()) {
            return d.toLocaleDateString('de-CH', {
                day: '2-digit',
                month: 'short'
            })
        }

        return d.toLocaleDateString('de-CH', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    return d.toLocaleDateString('de-CH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

export const toDate = (date?: Date | number | string) => {
    let d = date

    if (typeof date === 'undefined' || date === null) {
        return undefined
    }

    if (typeof d === 'string') {
        d = parseInt(d, 10)
    }

    if (typeof d === 'number') {
        d = new Date(d)
    }

    return d
}

export const secondsToTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    seconds %= 3600
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60

    const strSeconds = String(sec).padStart(2, '0')
    const strMinutes = String(min).padStart(2, '0')
    const strHours = String(hrs).padStart(2, '0')

    if (hrs === 0) {
        return `${strMinutes}:${strSeconds}`
    }

    return `${strHours}:${strMinutes}:${strSeconds}`
}
