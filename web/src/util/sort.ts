import { EMediumSort } from '@/types/app'
import { TMedium } from '@photon/schema'

export const sortMediaByDate = (media: TMedium[], sortBy: EMediumSort) => {
    return [...media].sort((a, b) => {
        const sortByIndex = sortBy === EMediumSort.RECENT ? 'dateCreated' : 'dateTaken'

        let aTime
        let bTime

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
