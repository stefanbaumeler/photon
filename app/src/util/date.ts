import { EDateFormat } from '@/types/app'

export const getRelativeTime = (d1: Date, d2 = new Date()) => {
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

    const elapsed = d1.getTime() - d2.getTime()

    for (const u in units) {
        if (Math.abs(elapsed) > units[u] || u === 'second') {
            return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit)
        }
    }
}

export const formatDate = (date?: Date | number | string, format: EDateFormat = EDateFormat.SHORT) => {
    let d = date

    if (typeof date === 'undefined') {
        return
    }

    if (typeof d === 'string') {
        d = parseInt(d, 10)
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

    if (typeof date === 'undefined') {
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
