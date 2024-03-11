import { ReactNode } from 'react'

type Props = {
    title?: string
    description?: string
    children?: ReactNode
}

export const Setting = ({
    title, description, children
}: Props) => {
    return <div className="setting">
        <div className="setting__row">
            {title ? <h3 className="setting__title">
                {title}
            </h3> : null}
            {description ? <div className="setting__description">
                {description}
            </div> : null}
        </div>
        <div className="setting__row">
            {children}
        </div>
    </div>
}
