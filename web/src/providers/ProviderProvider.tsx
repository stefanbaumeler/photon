import { ReactNode, JSXElementConstructor, PropsWithChildren } from 'react'

interface Props {
    components: JSXElementConstructor<PropsWithChildren>[]
    children: ReactNode
}

export const ProviderProvider = (props: Props) => {
    const {
        components = [], children, ...childProps
    } = props

    return (
        <>
            {components.reduceRight((acc, Component) => {
                return <Component {...childProps}>
                    {acc}
                </Component>
            }, children)}
        </>
    )
}
