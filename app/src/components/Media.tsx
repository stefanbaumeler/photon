import { TMedia } from '@/types/api'
import { MediaSection } from '@/components'

type Props = {
    media: TMedia[]
}

const Media = ({ media }: Props) => {
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
