import { TMedia } from '@/types/api'
import { MediaSection } from '@/components'
import { useContext, useEffect } from 'react'
import { DetailsContext, SelectionContext } from '@/providers'

type Props = {
    media: TMedia[]
}

const Media = ({ media }: Props) => {
    const { clearSelected } = useContext(SelectionContext)
    const { active } = useContext(DetailsContext)

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (!active) {
                    clearSelected()
                }
            }
        }

        window.addEventListener('keydown', keydown)

        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [active])

    return <div className="media">
        <div className="media__header">
            sort
        </div>
        <div className="media__sections">
            <MediaSection media={media} />
        </div>
    </div>
}

export default Media
