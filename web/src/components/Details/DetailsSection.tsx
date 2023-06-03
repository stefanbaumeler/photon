import { ReactNode } from 'react'

type Props = {
    title: string
    children: ReactNode
}

export const DetailsSection = ({
    title, children
}: Props) => {
    return <div className="details__section">
        <h3 className="details__title">
            {title}
        </h3>
        {children}
    </div>
}
