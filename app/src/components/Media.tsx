import { TMedium } from '@/types/api'
import { MediaSection } from '@/components'
import { useContext, useEffect } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'

type Props = {
    media: TMedium[]
}

const Media = ({ media }: Props) => {
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)
    const dialog = useContext(DialogContext)

    const takenDates = new Set<string>()

    media.forEach((medium) => {
        takenDates.add(new Date(parseInt(medium.dateTaken, 10)).toLocaleDateString('de-CH'))
    })

    const sections = Array.from(takenDates).map((takenDate, key) => {
        const mediaTakenOnThisDate = media.filter((medium) => new Date(parseInt(medium.dateTaken, 10)).toLocaleDateString('de-CH') === takenDate)
        return <MediaSection
            key={key}
            title={takenDate}
            media={mediaTakenOnThisDate}
            collection={media}
        />
    })

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (!details.active && !dialog.active) {
                    selection.clear()
                }
            }
        }

        window.addEventListener('keydown', keydown)

        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [details.active, dialog.active])

    return <div className="media">
        <div className="media__header">
            sort
        </div>
        <div className="media__sections">
            {sections}
        </div>
    </div>
}

export default Media
