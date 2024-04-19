import { EMediumSort } from '@/types/app'

type TSortMedium = {
    dateCreated: string
    dateTaken: string
}

export const sortMediaByDate = <T extends TSortMedium[]>(media: T, sortBy: EMediumSort) => {
    return media.sort((a, b) => {
        const sortByIndex = sortBy === EMediumSort.RECENT ? 'dateCreated' : 'dateTaken'

        let aTime = 0
        let bTime = 0

        if (a[sortByIndex] && b[sortByIndex]) {
            aTime = new Date(a[sortByIndex]).getTime()
            bTime = new Date(b[sortByIndex]).getTime()
        } else if (a.dateCreated && b.dateCreated) {
            aTime = new Date(a.dateCreated).getTime()
            bTime = new Date(b.dateCreated).getTime()
        }

        return sortBy === EMediumSort.OLDEST ? aTime - bTime : bTime - aTime
    })
}
