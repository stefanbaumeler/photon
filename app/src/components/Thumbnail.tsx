import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { EThumbnailType, TThumbnail } from '@/types/app'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { useMedium } from '@/api/hooks/media'
import bem from '@/util/bem'

const Thumbnail = ({
    idMedium, title, onClick,
    type = EThumbnailType.DEFAULT
}: TThumbnail) => {
    const { t } = useTranslation()

    const medium = useMedium({
        id: `${idMedium}`
    })

    const labelClasses = bem('thumbnail__label', [
        ['empty', !title?.length]
    ])

    if (type === EThumbnailType.ADD) {
        return <button
            className="thumbnail thumbnail--new"
            onClick={onClick}
        >
            <div className="thumbnail__image-container">
                <Icon
                    className="thumbnail__icon"
                    path={Icons.mdiPlus}
                    size={1}
                />
            </div>
            <div className="thumbnail__label thumbnail__label--empty">
                {title}
            </div>
        </button>
    }

    const ThumbnailImage = () => {
        if (!medium.state.filenameDisk) {
            return <></>
        }

        return <img
            className="thumbnail__image"
            src={`${process.env.NEXT_PUBLIC_UPLOADS_DIR}${medium.state.filenameDisk}?w=100`}
            alt=""
        />
    }

    return <button
        className="thumbnail"
        onClick={onClick}
    >
        <div className="thumbnail__image-container">
            <ThumbnailImage />
        </div>
        <div className={labelClasses}>
            {title || t(ETrans.UNTITLED)}
        </div>
    </button>
}

export default Thumbnail
