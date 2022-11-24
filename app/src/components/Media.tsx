import { TMedium } from '@photon/shared'
import { useContext, useEffect } from 'react'
import { DetailsContext, DialogContext, LayoutContext, SelectionContext } from '@/providers'
import useKeyboard from '@/hooks/keyboard'
import { ELayout } from '@/types/app'
import { GalleryView, ListView } from '@/components'
import { toDate } from '@/util/date'

type Props = {
    media: TMedium[]
}

const Media = ({ media }: Props) => {
    const selection = useContext(SelectionContext)
    const details = useContext(DetailsContext)
    const dialog = useContext(DialogContext)
    const layout = useContext(LayoutContext)

    useEffect(() => {
        if (details.medium && Object.keys(details.medium).length) {
            details.setMedium(media.find((m) => m.id === details.medium.id))
        }
    }, [media])

    const mediaSortedByDateTaken = Array.from(media)
        .sort((a, b) => toDate(b.dateTaken).getTime() - toDate(a.dateTaken).getTime())

    useKeyboard('keydown', 'Escape', () => {
        if (!details.active && !dialog.active) {
            selection.clear()
        }
    }, [details.active, dialog.active])

    if (layout.layout === ELayout.GALLERY) {
        return <GalleryView media={mediaSortedByDateTaken} />
    }

    if (layout.layout === ELayout.LIST) {
        return <ListView media={mediaSortedByDateTaken} />
    }

    return <>
        {layout.layout}
    </>
}

export default Media
