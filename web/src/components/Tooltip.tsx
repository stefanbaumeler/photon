import { ReactElement } from 'react'
import Tippy from '@tippyjs/react'
import { Placement } from 'tippy.js'

type Props = {
    children: ReactElement
    hint?: string
    placement?: Placement
}
export const Tooltip = ({
    children, hint, placement
}: Props) => {
    if (hint) {
        return <Tippy
            content={hint}
            placement={placement}
        >
            {children}
        </Tippy>
    }

    return <>
        {children}
    </>
}
