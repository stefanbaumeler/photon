import { ReactNode } from 'react'

type Props = {
    title: string
    children: ReactNode
}

export const InfobarSection = ({
    title, children
}: Props) => {
    return <div className="infobar__section">
        <h3 className="infobar__title">
            {title}
        </h3>
        {children}
    </div>
}
