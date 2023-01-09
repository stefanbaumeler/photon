import Icon from '@mdi/react'

type Props = {
    icon: string
    title: string
    values: string | string[]
}

export const Detail = ({
    icon, title, values
}: Props) => {
    values = Array.isArray(values) ? values : [values]

    return <div className="detail">
        <div className="detail__icon">
            <Icon
                path={icon}
                size={1}
            />
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
