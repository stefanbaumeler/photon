import { ReactElement } from 'react'
import Tippy from '@tippyjs/react'
import { Placement } from 'tippy.js'

type Props = {
    hint?: {
        label: string
        placement?: Placement
    } | string
    shortcut?: string
    children: ReactElement
}
export const ButtonTip = ({
    children, hint, shortcut
}: Props) => {
    if (!hint) {
        if (shortcut) {
            return <Tippy content={`(${shortcut})`}>
                {children}
            </Tippy>
        }
        return <>
            {children}
        </>
    }

    if (typeof hint === 'string') {
        const hintWithShortcut = shortcut ? `${hint} (${shortcut})` : hint

        return <Tippy
            content={hintWithShortcut}
        >
            {children}
        </Tippy>
    }

    return <Tippy
        content={shortcut ? `${hint.label} (${shortcut})` : hint.label}
        placement={hint.placement}
    >
        {children}
    </Tippy>
}
