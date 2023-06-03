import { ReactNode } from 'react'

type Props = {
    title?: string
    description?: string
    children?: ReactNode
}

export const Setting = ({
    title, description, children
}: Props) => {
    const Title = () => {
        if (!title) {
            return <></>
        }

        return <h3 className="setting__title">
            {title}
        </h3>
    }

    const Description = () => {
        if (!description) {
            return <></>
        }

        return <div className="setting__description">
            {description}
        </div>
    }

    return <div className="setting">
        <div className="setting__row">
            <Title />
            <Description />
        </div>
        <div className="setting__row">
            {children}
        </div>
    </div>
}
