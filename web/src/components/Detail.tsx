import Icon from '@mdi/react'
import { TMedium } from '@photon/schema'
import { Thumbnail } from 'web/src/components/Thumbnail'

type Props = {
    icon: string | TMedium
    title: string
    values?: string | string[]
}

export const Detail = ({
    icon, title, values
}: Props) => {
    values = Array.isArray(values) ? values : [values]

    const IconOrThumbnail = () => {
        if (typeof icon === 'string') {
            return <Icon
                path={icon}
                size={1}
            />
        }
        else {
            return <img
                className="detail__image"
                src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${icon.filenameDisk}?w=100`}
                alt=""
            />
        }
    }

    return <div className="detail">
        <div className="detail__icon">
            <IconOrThumbnail />
        </div>
        <div className="detail__content">
            <span className="detail__title">
                {title}
            </span>
            <div className="detail__values">
                {values.map((value, k) => <span
                    key={k}
                    className="detail__value"
                >
                    {value}
                </span>)}
            </div>
        </div>
    </div>
}
