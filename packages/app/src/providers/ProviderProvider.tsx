import { ReactNode, JSXElementConstructor, PropsWithChildren } from 'react'

interface Props {
    components: Array<JSXElementConstructor<PropsWithChildren>>
    children: ReactNode
}

const ProviderProvider = (props: Props) => {
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

export default ProviderProvider
