import Icon from '@mdi/react'
import * as Icons from '@mdi/js'
import { EThumbnailType, TThumbnail } from 'web/src/types/app'
import { useTranslation } from 'react-i18next'
import { ETrans } from 'web/src/types/translations'
import bem from '../util/bem'
import { TMedium, useQMedium } from '@photon/schema'
import { useEffect, useState } from 'react'

export const Thumbnail = ({
    idMedium, title, onClick,
    type = EThumbnailType.DEFAULT
}: TThumbnail) => {
    const { t } = useTranslation()

    const [medium, setMedium] = useState<TMedium>()

    const mediumQuery = useQMedium({
        variables: {
            id: `${idMedium}`
        },
        skip: !idMedium
    })

    const labelClasses = bem('thumbnail__label', [
        ['empty', !title?.length]
    ])

    useEffect(() => {
        if (mediumQuery.data) {
            setMedium(mediumQuery.data.medium as TMedium)
        }
    }, [mediumQuery.data])

    if (type === EThumbnailType.ADD) {
        return <button
            data-testid="thumbnail-new"
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
        if (mediumQuery.loading) {
            return <></>
        }

        if (!medium.filenameDisk) {
            return <></>
        }

        return <img
            className="thumbnail__image"
            src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${medium.filenameDisk}?w=100`}
            alt=""
        />
    }

    if (!medium) {
        return <></>
    }

    return <button
        data-testid="thumbnail"
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
