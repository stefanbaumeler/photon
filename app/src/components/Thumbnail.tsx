import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { EThumbnailType, TThumbnail } from '@/types/app'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { useMedia } from '@/api/hooks'
import { useMediumQuery } from '@/types/api'
import { useMedium } from '@/api/hooks/media'

const Thumbnail = ({
    idMedium, title, onClick,
    type = EThumbnailType.DEFAULT
}: TThumbnail) => {
    const { t } = useTranslation()

    const { state: [{ medium: icon }] } = useMedium({
        id: `${idMedium}`
    })

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
        if (!icon[0]?.filenameDisk) {
            return <></>
        }

        return <img
            className="thumbnail__image"
            src={`http://localhost:2000/uploads/${icon[0]?.filenameDisk}?w=100`}
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
        <div className={`thumbnail__label${title?.length ? '' : ' thumbnail__label--empty'}`}>
            {title || t(ETrans.UNTITLED)}
        </div>
    </button>
}

export default Thumbnail
