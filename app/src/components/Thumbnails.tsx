import { Thumbnail } from '@/components'
import { TThumbnail } from '@/types/app'

type Props = {
    thumbnails: TThumbnail[]
}

const Thumbnails = ({ thumbnails }: Props) => {
    return <div className="thumbnails">
        {thumbnails.map((thumbnail, k) => <Thumbnail
            title={thumbnail.title}
            idMedium={thumbnail.idMedium}
            key={k}
            onClick={thumbnail.onClick}
            type={thumbnail.type}
        />)}
    </div>
}

export default Thumbnails
