import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { EThumbnailType, TThumbnail } from '@/types/app'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import bem from '@/util/bem'
import { TMedium, useMediumQuery } from '@/types/api'
import { useEffect, useState } from 'react'

const Thumbnail = ({
    idMedium, title, onClick,
    type = EThumbnailType.DEFAULT
}: TThumbnail) => {
    const { t } = useTranslation()

    const [medium, setMedium] = useState<TMedium>({})

    const mediumQuery = useMediumQuery({
        variables: {
            id: `${idMedium}`
        }
    })

    const labelClasses = bem('thumbnail__label', [
        ['empty', !title?.length]
    ])

    useEffect(() => {
        if (mediumQuery.data) {
            setMedium(mediumQuery.data.medium[0])
        }
    }, [mediumQuery.data])

    if (mediumQuery.loading) {
        return <></>
    }

    if (type === EThumbnailType.ADD) {
        return <button
            data-cy="thumbnail-new"
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
        if (!medium.filenameDisk) {
            return <></>
        }

        return <img
            className="thumbnail__image"
            src={`${process.env.NEXT_PUBLIC_UPLOADS_DIR}${medium.filenameDisk}?w=100`}
            alt=""
        />
    }

    return <button
        data-cy="thumbnail"
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
