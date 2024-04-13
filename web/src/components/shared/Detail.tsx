import Icon from '@mdi/react'
import { TCover } from '@/types/app'

type Props = {
    icon: string | TCover
    title: string
    values?: string | string[]
    testId?: string
}

export const Detail = ({
    icon, title, values, testId
}: Props) => {
    values = Array.isArray(values) ? values : [values]

    return <div
        className="detail"
        data-testid={testId}
    >
        <div className="detail__icon">
            {typeof icon === 'string' ? <Icon
                path={icon}
                size={1}
            /> : null}
            {icon && typeof icon !== 'string' ? <img
                className="detail__image"
                src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/${icon.filenameDisk}?w=100`}
                alt=""
            /> : null}
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
